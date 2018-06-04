# Service (API) Project

This directory is for containing the api portion of challenge.

# how to use

Run "npm start" , all the 3 servers will be running on port 8000,3051,3050

# how to test

Run "npm test"

# Api abstract

This folder contains 3 api server.

1. Service server.

   Service server is hardcoded at localhost:8000

   Service server do the job of receiving orders from customer and displaying all the orders

   1. Entry point POST /order

       This is the path which takes order from customer and then send them to supllier then give a feedback to customer

       It will read four fields from body of request. They are customer_id, make , model ,pacakge.

       if the value of the fields are proper. It will return a json response indicatng success and the download_link of the json file.

       sample output:
		        200,{"status":"success","download_link":"http://localhost:8000/orders/order-6277.json"}
      	the new generated order-6277.json file will be stored in ./Service/orders

       error handling of this api is indicated by and error code and error message describing the error. The expected error are listed below

       - missing parameters : 400, "Missing parameters!" It indicates that the 4 required field are not given in request.body

       - unknown customer: 400,"The customer cannot be recongnized!" It indicates that the customer_id isn't stored in the database at first

       - unreachable address: 400,"Unreachable address!" It means the that the customer's address is out of US.

       - unknown make value: 400,"Unrecognized make value!" It means that the make value is neither "acme" nor "rainer"

       - error from supplier: 400,{err.messsage} if the model or package value is incorrect, this api would get an error code from suppliers, the err.message indicates the error itself.

       - mongodb error: 500,"mongodb Error". It indicates that there are some error in database.

       - writing file error: 500,"Writing file error". It indicates the server fails to create a file for downloading
  2. Entry point GET /orders

    This path returns all the orders has been made so far.
    In this path, username and password are required for authentication. The purpose is that this path is only for internal use. To manage this. I created two user in database.
    they are
    - {"admin","admin"}
    - {"Guangyi","firelord"}
    they should be passed in the header of request as field name of "username" and "password"

    the sample output of this path would be 200,\[
    {
        "\_id": "5b146a5e9d6f3713d4b3a713",
        "order_id": "7940",
        "make": "rainer",
        "model": "olympic",
        "package": "mtn",
        "customer_id": "1",
        "\_\_v": 0
    }
\]

     error handling of this path is indicated by and error code and error message describing the error. The expected error are listed below

       - 403,"Unknown user!" which means the username is not in database

       - 403,"Wrong password", which means the password does not match.

       - 503,"mongodb find error", would raise if there are errro with mongodb

2. acme server

    acme server supports making order with acme.

    it is hosted at localhost:3050

    1. Entry point POST /order

        This is the path which takes order and return a order_id

        It will read 3 fields from body of request. They are api_key, model ,pacakge.

        model can only be one within \["anvil","wile","roadrunner"\]

        package can only be one within \["std","super","elite"\]

        otherwise an error would be returned

        if the value of the fields are proper. It will return a json response indicatng success and the download_link of the json file.

        sample output:
 		        200,{"order":100}

        the order number are randomly generated here.

        the api_key is hardcoded so that I am only comparing two string

        error handling of this api is indicated by and error code and error message describing the error. The expected error are listed below

        - missing parameters : 400, "Missing parameters!" It indicates that the 3 required field are not given fully in request.body

        - wrong api key: 403,"Wrong api key". It indicates that the api key is not correct.

        - unknown model value: 400,"Wrong model value!" It means that the model value is incorrect

        - unknown package value: 400,"Wrong package value!" It means that the pacakge value is incorrect


3. rainer server

  rainer server supports making order with rainer.

  it is hosted at localhost:3051

  1. Entry point GET /nonce_token

      This is the path to generate a token. it requires a parameter storefront .

      In this project, for implementation,the storefront and the token are hardcoded.

      The sample response would be:200,{"nonce_token": "ff6bfd673ab6ae03d8911"}

      error handling of this api is indicated by and error code and error message describing the error. The expected error are listed below

      - 400,"Missing required parameters!" which means that stonefront is not given

      - 403,"Wrong storefront". which indicates that the given storefront is invalid.


  2. Entry point POST /request_customized_model

      This is the path which takes order and return a order_id

      It will read 3 fields from body of request. They are api_key, model ,pacakge.

      model can only be one within \["pugetsound","olympic"\]

      package can only be one within \["mtn","ltd","14k"\]

      otherwise an error would be returned

      if the value of the fields are proper. It will return a json response indicatng success and the download_link of the json file.

      sample output:
          200,{"order_id":6277}

      the order number are randomly generated here.

      the api_key is hardcoded so that I am only comparing two string

      error handling of this api is indicated by and error code and error message describing the error. The expected error are listed below

      - missing parameters : 400, "Missing parameters!" It indicates that the 3 required field are not given fully in request.body

      - wrong api key: 403,"Wrong token". It indicates that the token is not correct.

      - unknown model value: 400,"Wrong model value!" It means that the model value is incorrect

      - unknown package value: 400,"Wrong package value!" It means that the pacakge value is incorrect
