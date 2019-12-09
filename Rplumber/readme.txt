library(plumber)
r <- plumb("julian.R")  # Where 'plumber.R' is the location of the file shown above
r$run(port=8000)