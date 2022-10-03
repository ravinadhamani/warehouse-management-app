# warehouse-management-app
warehouse-management-app

Application Details: 

1. Login Page

2. Dashboard Page

3. Products Page 

4. Accounts Page 

5. Add New Product Page 



Functionalities Pagewise: 

You have to make a single API call request to get the data for all the pages at once, store the response in local storage, and then use it page-wise. 

API Call: https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json 



1. Login Page: 

- Add Validations for Username and Password 

- Proceed with Login only if the Username and Password are valid 

- Show Dashboard Page after Validation is successful 



2. Dashboard Page: 

- This page has 5 Sections: 

1. Latest Hits, 

2. Performance, 

3. Storage Information, 

4. Notification List, 

5. Order List 

- Used the charts.js or apex chart libraries to draw the graphs in sections: (1),(2),(3) 



3. Products Page: 

- This page has two sections: 

a) Product List Section on Left 

b) Product Categories Section on Right 

- User can add a new product by clicking on the 'ADD NEW PRODUCT' Button - The user should be redirected to the Add New Product Page when he clicks the 'ADD NEW PRODUCT' Button 

- User can delete an existing product from the List by clicking on the delete icon - User can delete multiple existing products by selecting the checkboxes and clicking on the 'DELETE SELECTED PRODUCTS' Button 

- Users can add a new Category by clicking on the 'ADD NEW CATEGORY' Button - You can add a popup for adding a new category in the list. Design it as per your choice, but make sure to maintain consistency with the website theme. 



4. Add New Product Page: 

- Add Validations for Name, Description, Category, Date, and Units fields. - Validations required for the Upload Image field: The file type can only be JPG, PNG, BMP, SVG, and WEBP. The file cannot be more than 1MB in size. 

- User should be redirected back to the Products Page and should see the newly added product in the Product List 



5. Accounts Page: 

- There are 4 types of accounts: Admin, Editor, Merchant, Customer 

- When the user selects an account from DropDown the corresponding information should be visible in the respective form fields along with the profile pic - The user can delete his photo when clicked on the delete icon on the photo - The user can upload a new photo 

- User can edit any of the form fields on the right 

- When a user clicks on the 'UPDATE YOUR PROFILE' Button, the information should be stored in the local storage and next time when a user comes back to see the account in the same session then the updated information should be present in the fields along with the photo. 

- Once the user clicks on the 'UPDATE YOUR PROFILE' Button, show a confirmation message on the popup 'Information Updated Successfully!'

