# korint-test-case

### **Description**

We want you to design a simple CRUD API that allow to manage customers and claims attached to them.

To create a customer, you must provide an email and a name.

When we get a customer, we want an email, a name and the sum of all the claims point value attached to the customer.

Claims should be attached to a customer. They contain a title, a description and point value (an integer).

We should have the possibility to batch create claims.

Bonus : This API will be called by a partner and we want to protect the API with a simple authentication mechanism.

### **Requirements**

We want to run `docker-compose up` and see it running

You must use NestJS, Typescript and Postgres.

You are free to add any additional lib.