# myfile.R

#* @filter cors
cors <- function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}

#' @get /mean
normalMean <- function(samples=10){
  data <- rnorm(samples)
  mean(data)
}

#* @preempt cors
#' @post /sum
addTwo <- function(a, b){
  as.numeric(a) + as.numeric(b)
}

#* Plot a histogram
#* @png
#* @preempt cors
#* @get /plot
function(){
  rand <- rnorm(100)
  hist(rand)
}

