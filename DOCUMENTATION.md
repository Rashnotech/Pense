# PENSE REST API Development



## CREATE
Copy this above url to postman or any endpoint, you can supply raw json text or form-data.
**Note**: Make sure it's a POST request and it takes only string other data type will return error
```
Usage: /api
{
    "name": "Person Name"
}
on success: {'message': 'User created successfully'}
on failure: {'error': 'Name is required'}
```
## READ
Make use of the GET Request to retrieve all users or a specific user
```
Usage: /api/user_id or /api
on success: [{'user_id': user_id, 'name': name}]
on failure: {'error': 'User not found'}
```
## UPDATE
Make use of the PUT Request to update the data in the record
```
Usage: /api/user_id
on success: {'message': 'User updated successfully'}
on failure: {'error': 'Name is required'}
```
## DELETE
Make use of the DELETE Request to Remove entity from database.
```
Usage: /api/user_id
on success: {'message': 'User deleted successfully'}
on error: {'error': 'User not found'}
```
