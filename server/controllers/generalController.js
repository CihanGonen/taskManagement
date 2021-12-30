const pool = require("../db/index");

module.exports.baskanlik_post = async (req, res) => {
  //başkanlık eklerken başkanlıklar listelenir ve ordan seçilen başkanlık ismi ile idsi bulunur ve eklenir
  const { adi, ustBaskanlik } = req.body;

  try {
    // check if baskanlik exist (if exists throw err)
    const baskanlik = await pool.query(
      "SELECT * FROM baskanliklar WHERE adi=$1",
      [adi]
    );
    if (baskanlik.rows.length !== 0) {
      return res.status(401).json("Bu başkanlık zaten var");
    }

    // get the ustBaskanlik_id from db using its name
    let ustBaskanlik_id = "";
    if (ustBaskanlik) {
      ustBaskanlik_id = await pool.query(
        "SELECT baskanlik_id FROM baskanliklar where adi=$1",
        [ustBaskanlik]
      );

      ustBaskanlik_id = ustBaskanlik_id.rows[0].baskanlik_id;
    }

    // enter the new baskanlik inside db
    const newBaskanlik = ustBaskanlik_id
      ? await pool.query(
          "INSERT INTO baskanliklar (adi,ustbaskanlik_id) VALUES ($1,$2) RETURNING *",
          [adi, ustBaskanlik_id]
        )
      : await pool.query(
          "INSERT INTO baskanliklar (adi) VALUES ($1) RETURNING *",
          [adi]
        );

    res.status(201).json(newBaskanlik.rows);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.baskanlik_get = async (req, res) => {
  try {
    // check if baskanlik exist (if exists throw err)
    const baskanliks = await pool.query("SELECT * FROM baskanliklar");
    // bunları listede gösterirken önce null olanlar bir diziye aktarılır sonra 2 boyutlu bir dizide null olmayanlar üst başkanlığa doğru ilerler eğer sonunda eleman kalıyosa yeni bir listeye geçilir ve böyle devam eder
    res.status(201).json(baskanliks.rows);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.yetki_get = async (req, res) => {
  try {
    const yetkis = await pool.query("SELECT * FROM yetkiler");
    res.status(201).json(yetkis.rows);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.talep_post = async (req, res) => {
  const { talepkarId, tanim, baskanlik_id } = req.body;

  try {
    let atayan_id = await pool.query(
      "SELECT kullanici_id FROM kullanicilar WHERE baskanlik_id=$1 AND yetki_id=2",
      [baskanlik_id]
    );

    atayan_id = atayan_id.rows[0].kullanici_id;

    const newTalep = await pool.query(
      "INSERT INTO talepler (tanim,talepkar_id,atayan_id,durum_id) VALUES ($1,$2,$3,1) RETURNING *",
      [tanim, talepkarId, atayan_id]
    );
    res.status(201).json(newTalep.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

module.exports.talep_getAll = async (req, res) => {
  try {
    const taleps = await pool.query("SELECT * FROM talepler");
    res.status(201).json(taleps.rows);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.talep_getOne = async (req, res) => {
  try {
    const userId = req.user;
    const { talepId } = req.params;
    const talep = await pool.query("SELECT * FROM talepler WHERE talep_id=$1", [
      talepId,
    ]);
    console.log(talep.rows);
    if (talep.rows.length <= 0) {
      return res.status(400).send("Bu id'ye sahip talep bulunmamaktadır");
    } else {
      if (
        talep.rows[0].atayan_id === userId ||
        talep.rows[0].atanan_id === userId
      ) {
        return res.status(200).send(talep.rows[0]);
      } else {
        return res.status(401).send("Bu talebe erişiminiz yoktur");
      }
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.talep_ataPut = async (req, res) => {
  const { talepId } = req.params;
  const { atanan_id } = req.body;
  try {
    // talep var mı kontrolü
    const talepVarMi = await pool.query(
      "SELECT * FROM talepler where talep_id=$1",
      [talepId]
    );

    if (talepVarMi.rows.length > 0) {
      const talep = await pool.query(
        "UPDATE talepler SET atanan_id=$1,atanma_zamani=CURRENT_TIMESTAMP, durum_id=2 WHERE talep_id=$2 RETURNING *",
        [atanan_id, talepId]
      );
      return res.status(200).json(talep.rows[0]);
    }
    {
      return res.status(400).json("bu talep bulunmamaktadır");
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

module.exports.talep_bitirPut = async (req, res) => {
  const { talepId } = req.params;
  try {
    // talep var mı kontrolü
    const talepVarMi = await pool.query(
      "SELECT * FROM talepler where talep_id=$1",
      [talepId]
    );

    if (talepVarMi.rows.length > 0) {
      const talep = await pool.query(
        "UPDATE talepler SET durum_id=3 WHERE talep_id=$1 RETURNING *",
        [talepId]
      );
      return res.status(200).json(talep.rows[0]);
    }
    {
      return res.status(400).json("bu talep bulunmamaktadır");
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

module.exports.talep_kapatPut = async (req, res) => {
  const { talepId } = req.params;
  try {
    // talep var mı kontrolü
    const talepVarMi = await pool.query(
      "SELECT * FROM talepler where talep_id=$1",
      [talepId]
    );

    if (talepVarMi.rows.length > 0) {
      const talep = await pool.query(
        "UPDATE talepler SET durum_id=4 WHERE talep_id=$1 RETURNING *",
        [talepId]
      );
      return res.status(200).json(talep.rows[0]);
    }
    {
      return res.status(400).json("bu talep bulunmamaktadır");
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

module.exports.yorum_post = async (req, res) => {
  const { icerik, talep_id, kullanici_id } = req.body;
  try {
    const newYorum = await pool.query(
      "INSERT INTO yorumlar (icerik,talep_id,kullanici_id) VALUES ($1,$2,$3) RETURNING *",
      [icerik, talep_id, kullanici_id]
    );
    res.status(201).json(newYorum.rows);
  } catch (err) {
    console.log(err.message);
    res.status(401).json(err.message);
  }
};

module.exports.yorum_get = async (req, res) => {
  try {
    const { talepId } = req.params;
    const yorumlar = await pool.query(
      "SELECT * FROM yorumlar WHERE talep_id = $1",
      [talepId]
    );
    res.status(200).json(yorumlar.rows);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.personel_post = async (req, res) => {
  try {
    const { baskanlik_id } = req.body;

    const personeller = await pool.query(
      "SELECT * FROM kullanicilar WHERE baskanlik_id=$1 AND yetki_id=3",
      [baskanlik_id]
    );

    res.status(200).json(personeller.rows);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.baskanlar_get = async (req, res) => {
  try {
    const baskanlar = await pool.query(
      "SELECT baskanlik_id FROM kullanicilar WHERE yetki_id=2"
    );

    const baskanlarBaskanlikIdler = baskanlar.rows.map(
      (baskan) => baskan.baskanlik_id
    );

    res.status(200).json(baskanlarBaskanlikIdler);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.kullanici_get = async (req, res) => {
  try {
    const { kullaniciId } = req.params;
    const kullanici = await pool.query(
      "SELECT name,email FROM kullanicilar WHERE kullanici_id = $1",
      [kullaniciId]
    );
    res.status(200).json(kullanici.rows[0]);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
