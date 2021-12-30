# Task Management System for my College


It's a graduation project of mine. I'm building a task management system for my school. In this website there are 4 types of user; admins, heads of department, employees of department and visitors. The main idea is everyone can create a task for a specific department. Every departments heads will assign these tasks to employees of the department and they will communicate on tasks.

I used React in the client and Node in server. Since there are many relations between entitites I decided to use a relational database and I chose PostgreSQL. For authentication and authorization operations I used json web tokens aka. JWT.


At first I designed the database and relations between each table. Afterwards I created my database in Postgresql and started creating routes using Node. Before getting into client side I created every route that I think I will need and I tested them using Postman.
