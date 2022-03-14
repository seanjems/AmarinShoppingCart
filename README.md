# AmarinShoppingCart
This project is a test project created for AmarinFinancial by Najuna James. This is more of proof of concept project and consists of an ASP.NET core 5 web API for the backend and ReactJS front end.

The project can work as a starter template for an online shopping website or shopping cart. Currently, there are four entities; i.e, 
Pages:- for managing static pages and generating non dynamic parts of the website such as home page/landing page or about-us page or contact-us page and so on. This entinty is equiped or will be equiped with a WYSIWYG editor such as CKEDITOR for easy manipulation of the pages.

Categories entity is for classiying the different products sold on your website and also helps in establishing relationships between the different products on your site.

Suppliers enity stores the supplier information and also gives you an additional categorization option for the products on your site.

Products entity gives you options to manipulate and work with the products sold on your website. The products entity refrences the categories and supplier enity and so the above two must be setup before working with a product.

All the entities have API methods for GET(get all and get one. Search is also planned in the future releases. ), POST, PUT AND DELETE. 

The front end is based on ReactJS and connects to the Backend API to implement all the methods above for demo purposes but can be modified and customised to the requirement.
