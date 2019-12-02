# load router
r <- plumber::plumb("./router.R")

////pr <- plumber::plumb("plumber.R")
pr$run(swagger = FALSE)
///  http://127.0.0.1:9188/echo

# start application
r$run(host="0.0.0.0", 
      port = 9090,
      swagger = FALSE)

      http://127.0.0.1:8630