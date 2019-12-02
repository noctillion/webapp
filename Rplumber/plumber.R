# plumber.R

#* @filter cors
cors <- function(res) {
    res$setHeader("Access-Control-Allow-Origin", "*")
    plumber::forward()
}


#* Echo back the input
#* @param msg The message to echo
#* @preempt cors
#* @get /echo
desabilitado <- function(msg=""){
  list(msg = paste0("The message is: '", msg, "'"))
}

#* Plot a histogram
#* @png
#* @preempt cors
#* @get /plot
function(){
  rand <- rnorm(100)
  hist(rand)
}

#* Return the sum of two numbers
#* @param a The first number to add
#* @param b The second number to add
#* @preempt cors
#* @post /sum
function(a, b){
  as.numeric(a) + as.numeric(b)
}
