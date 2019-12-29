# myfile.R
#setwd(system("pwd", intern = T) )
setwd('./mnt') ## esto se necesita en docker

library(pcr)
library(ggplot2)
library(cowplot)
library(jsonlite)
library(mongolite)
library(readr)
library(Rook)
library(dplyr)
library(stringi)
library(heatmaply)
library(magrittr)
library(ggplot2)
library(igraph)
library(networkD3)
library(GGally)
library(network)
library(sna)
library(sigmajs)

#* @filter cors
cors <- function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}
#' Plot a histogram
#' @png
#' @get /plot1
function(randnum=100){
  rand <- rnorm(100)
  hist(rand)
}
#' @get /mean
normalMean <- function(samples=10){
  data <- rnorm(samples)
  mean(data)
}
#' @post /sum
addTwo <- function(a, b){
  as.numeric(a) + as.numeric(b)
}


#* parse csv file
#* @param req the request object
#* @post /file
function(req) {
  file <- Rook::Multipart$parse(req)$req$tempfile
  result <- read.csv(file)
  result
}


#' Plot a histogram
#' @png
#* @param a the request object
#* @post /plot22
de <- function(a){
  m <- mongo(collection='csv', url = "mongodb://julian:Julian12345@ds155243.mlab.com:55243/mirna")
  alldata <- m$find(query='{"csvFile": "csvFile-1576219173979.csv"}', fields = '{"csvFile":true, "_id":false}')
  dr <- alldata$csvFile
  
  if (stri_isempty(dr)){
    print("no dr")
  }else{
    ct33 <- readr::read_csv(a)
    py<- ggplot() + geom_line(aes(y = c_myc, x = GAPDH),
                              data = ct33)
    print(py)
    
    print("chau")
    
  }
  }


#' Plot a histogram
#' @png
#* @post /plot23
de <- function(file){
    ct33<-readr::read_csv(file)
    py<- ggplot() + geom_line(aes(y = c_myc, x = GAPDH),
                              data = ct33)
    print(py)
    
    print("chau")
    
  }
##### este sirve bn NO MODIFICAR

#' Plot a histogram
#' @png
#* @param a the request object
#* @post /plot24
der <- function(file){
  m <- mongo(collection='csv', url = "mongodb://julian:Julian12345@ds155243.mlab.com:55243/mirna")
  alldata <- m$find(query='{}')
  print("hol1")
  arr <- dplyr::pull(alldata, csvFile)
  print("hol2")
  matches <- regmatches(arr, gregexpr("[[:digit:]]+", arr))
  print("hol3")
  unl <- array(unlist(matches))
  print(unl)
  print(file)
Sys.sleep(0.5)
  if (file %in% unl){
    print("hola")
      ##fl <- system.file('extdata', 'ct2.csv', package = 'pcr')
    var <- paste0('csvFile-',file,'.csv')
    print("hola")
      ct33<-readr::read_csv(var)
      py<- ggplot() + geom_line(aes(y = c_myc, x = GAPDH),
                                data = ct33)
      print(py)
  }else{
    print("chau")
}
}


##### este sirve bn 

#' Plot a histogram toma x y y tambien
#' @png
#* @param eny the request object
#* @param enx the request object
#* @post /plot34
deru <- function(file, eny, enx){
  m <- mongo(collection='csv', url = "mongodb://julian:Julian12345@ds155243.mlab.com:55243/mirna")
  alldata <- m$find(query='{}')
  print("hol1")
  arr <- dplyr::pull(alldata, csvFile)
  print("hol2")
  matches <- regmatches(arr, gregexpr("[[:digit:]]+", arr))
  print("hol3")
  unl <- array(unlist(matches))
  print(unl)
  print(file)
Sys.sleep(0.5)
  if (file %in% unl){
    print("hola")
      ##fl <- system.file('extdata', 'ct2.csv', package = 'pcr')
    var <- paste0('csvFile-',file,'.csv')
    print(var)
      ct33<-readr::read_csv(var)
      py<- ggplot() + geom_line(aes_string(y = eny, x = enx),
                                data = ct33)
      print(py)
  }else{
    print("chau")
}
}

###### 44 prueba Sirve bn no modificar recibe POST params
#' calculate amplification efficiency
#' @serializer unboxedJSON
#' @post /amepleff
allVal <- function(file, gv1,gv2,eacH,refGe,refGr){
  m <- mongo(collection='csv', url = "mongodb://julian:Julian12345@ds155243.mlab.com:55243/mirna")
  alldata <- m$find(query='{}')
  print("hol1")
  arr <- dplyr::pull(alldata, csvFile)
  print("hol2")
  matches <- regmatches(arr, gregexpr("[[:digit:]]+", arr))
  print("hol3")
  unl <- array(unlist(matches))
  print(unl)
  print(file)
Sys.sleep(0.5)
  if (file %in% unl){
    print("hola")
      ##fl <- system.file('extdata', 'ct2.csv', package = 'pcr')
    var <- paste0('csvFile-',file,'.csv')
    print(var)
      ct33<-readr::read_csv(var)
      group_var <- rep(c(gv1, gv2), each = as.numeric(eacH))
  res <- pcr_analyze(ct33,
                     group_var = group_var,
                     reference_gene = refGe,
                     reference_group = refGr)
  ##print(res)

  }else{
    print("chau")
}
}

####allVal('brain', 'kidney', 6,'GAPDH','brain')




#### no sirve .. la correlacion si
#' Plot a histogram
#' @png
#* @get /plot27
ret <- function(){
  ct33 <- read.csv("mtcars.csv", row.names=1)
  r <- cor(ct33)
  ## We use this function to calculate a matrix of p-values from correlation tests
  ## https://stackoverflow.com/a/13112337/4747043
  cor.test.p <- function(x){
    FUN <- function(x, y) cor.test(x, y)[["p.value"]]
    z <- outer(
      colnames(x), 
      colnames(x), 
      Vectorize(function(i,j) FUN(x[,i], x[,j]))
    )
    dimnames(z) <- list(colnames(x), colnames(x))
    z
  }
  p <- cor.test.p(ct33)
  
  print(p)
  print("aqui")
  
  heatmaply_cor(
    r,
    node_type = "scatter",
    point_size_mat = -log10(p), 
    point_size_name = "-log10(p-value)",
    label_names = c("x", "y", "Correlation")
  )
  browseURL("heatmaply_plot.html")
}





#' Plot a histogram
#' @png
#* @param a the request object
#* @post /plot25
de <- function(a){
  m <- mongo(collection='csv', url = "mongodb://julian:Julian12345@ds155243.mlab.com:55243/mirna")
  alldata <- m$find(query='{}')
  print("hol1")
  arr <- dplyr::pull(alldata, csvFile)
  Sys.sleep(0.5)
  print("hol2")
  var <- grep(a, arr, value=TRUE)
  Sys.sleep(0.5)
  print("hol3")
  ct33 <- read.csv(var)
  py<- ggplot() + geom_line(aes(y = c_myc, x = GAPDH),
                            data = ct33)
  print(py)
  
  print("chau")
}









# default mode delta_delta_ct
## locate and read raw ct data
fl <- system.file('extdata', 'ct1.csv', package = 'pcr')
ct1 <- read.csv(fl)

## add grouping variable
group_var <- rep(c('brain', 'kidney'), each = 6)

# calculate all values and errors in one step
## mode == 'separate_tube' default
res <- pcr_analyze(ct1,
                   group_var = group_var,
                   reference_gene = 'GAPDH',
                   reference_group = 'brain')

#res

## locate and read data

fl <- system.file('extdata', 'ct3.csv', package = 'pcr')
ct3 <- read.csv(fl)

## make a vector of RNA amounts
amount <- rep(c(1, .5, .2, .1, .05, .02, .01), each = 3)

## calculate amplification efficiency


res <- pcr_assess(ct3,
                  amount = amount,
                  reference_gene = 'GAPDH',
                  method = 'efficiency')
##res

## locate and read data
fl <- system.file('extdata', 'ct3.csv', package = 'pcr')
ct3 <- read.csv(fl)

## make a vector of RNA amounts
amount <- rep(c(1, .5, .2, .1, .05, .02, .01), each = 3)




res <- pcr_assess(ct3,
                  amount = amount,
                  reference_gene = 'GAPDH',
                  method = 'efficiency')


## calculate amplification efficiency
#' calculate amplification efficiency
#' @serializer unboxedJSON
#' @get /amef
ampef<- function(){
  pcr_assess(ct3,
                  amount = amount,
                  reference_gene = 'GAPDH',
                  method = 'efficiency')
}


##### funciona bien con body params en postman ver foto

## calculate amplification efficiency
#' calculate amplification efficiency
#' @serializer unboxedJSON
#' @post /amefile
ampef2 <- function(file, refGe, meth){
  m <- mongo(collection='csv', url = "mongodb://julian:Julian12345@ds155243.mlab.com:55243/mirna")
  alldata <- m$find(query='{}')
  print("hol1")
  arr <- dplyr::pull(alldata, csvFile)
  print("hol2")
  matches <- regmatches(arr, gregexpr("[[:digit:]]+", arr))
  print("hol3")
  unl <- array(unlist(matches))
  print(unl)
  print(file)
Sys.sleep(0.5)
  if (file %in% unl){
    print("hola")
      ##fl <- system.file('extdata', 'ct2.csv', package = 'pcr')
    var <- paste0('csvFile-',file,'.csv')
    print(var)
      ct33<-readr::read_csv(var)
      pcr_assess(ct33,
                  amount = amount,
                  reference_gene = refGe,
                  method = meth)
      
  }else{
    print("chau")
}
}


#### reference_gene = 'GAPDH'
#### method = 'efficiency'



















# Export a data frame
#write_json(res, "pcrres_2ju.json")

##knitr::kable(res, caption = 'Table 7: amplification efficiency of c-myc')

############################################### aqui

#' Plot a histogram
#' @png
#' @get /plot256
test2 <- function(){
  gg <- pcr_assess(ct3,
                   amount = amount,
                   reference_gene = 'GAPDH',
                   method = 'efficiency',
                   plot = TRUE)
  gg + 
    labs(x = 'log10 amount', y = 'Delta Ct') +
    theme(strip.background = element_blank(),
          strip.text = element_blank())
  print(gg)
}

###################### aqui

##### este sirve bn 

#' Plot a histogram toma x y y tambien
#' @png
#* @param eny the request object
#* @param enx the request object
#* @post /plot2
deru <- function(file, refGe, meth){
  m <- mongo(collection='csv', url = "mongodb://julian:Julian12345@ds155243.mlab.com:55243/mirna")
  alldata <- m$find(query='{}')
  print("hol1")
  arr <- dplyr::pull(alldata, csvFile)
  print("hol2")
  matches <- regmatches(arr, gregexpr("[[:digit:]]+", arr))
  print("hol3")
  unl <- array(unlist(matches))
  print(unl)
  print(file)
Sys.sleep(0.5)
  if (file %in% unl){
    print("hola")
      ##fl <- system.file('extdata', 'ct2.csv', package = 'pcr')
    var <- paste0('csvFile-',file,'.csv')
    print(var)
      ct33<-readr::read_csv(var)
      ######## grefica aqui#####
      gg <- pcr_assess(ct33,
                   amount = amount,
                   reference_gene = refGe,
                   method = meth,
                   plot = TRUE)
  gg + 
    labs(x = 'log10 amount', y = 'Delta Ct') +
    theme(strip.background = element_blank(),
          strip.text = element_blank())
print(gg)
      ######## grafica aqui#######
  }else{
    print("chau")
}
}

#### refGe 'GAPDH'

##meth 'efficiency'









# calculate the standard curve
pcr_assess(ct3,
           amount = amount,
           method = 'standard_curve')


#' Plot a histogram
#' @png
#' @get /plot3

test3 <- function(){
  af = pcr_assess(ct3,
           amount = amount,
           method = 'standard_curve',
           plot = TRUE)
  print(af)
}

# #* Plot a histogram
# #* @png
# #* @get /plot2
# 
# f()

# ggplot2 examples


# create factors with value labels
mtcars$gear <- factor(mtcars$gear,levels=c(3,4,5),
                      labels=c("3gears","4gears","5gears"))
mtcars$am <- factor(mtcars$am,levels=c(0,1),
                    labels=c("Automatic","Manual"))
mtcars$cyl <- factor(mtcars$cyl,levels=c(4,6,8),
                     labels=c("4cyl","6cyl","8cyl"))


  
#' Plot a histogram
#' @png
#' @get /plot4

test4 <- function(){
  pl= qplot(mpg, data=mtcars, geom="density", fill=gear, alpha=I(.5),
        main="Distribution of Gas Milage", xlab="Miles Per Gallon",
        ylab="Density")
  print(pl)
}



#' Plot a histogram
#' @png
#' @get /plot5
test1 = function(){
  p = data.frame(x=1,y= 1) %>% ggplot(aes(x=x,y=y)) + geom_point()
  print(p)
}



#' Plot a histogram
#' @png
#' @get /plot6
test2 <- function(){
  gg <- pcr_assess(ct3,
                   amount = amount,
                   reference_gene = 'GAPDH',
                   method = 'efficiency',
                   plot = TRUE)
  gg + 
    labs(x = 'log10 amount', y = 'Delta Ct') +
    theme(strip.background = element_blank(),
          strip.text = element_blank())
  print(gg)
}

######## hasta aqui bn #####




# root URL
r = "https://raw.githubusercontent.com/briatte/ggnet/master/"

# read nodes
v = read.csv(paste0(r, "inst/extdata/nodes.tsv"), sep = "\t")
names(v)

# read edges
e = read.csv(paste0(r, "inst/extdata/network.tsv"), sep = "\t")
names(e)


# network object
net = network(e, directed = TRUE)

# party affiliation
x = data.frame(Twitter = network.vertex.names(net))
x = merge(x, v, by = "Twitter", sort = FALSE)$Groupe
net %v% "party" = as.character(x)

# color palette
y = RColorBrewer::brewer.pal(9, "Set1")[ c(3, 1, 9, 6, 8, 5, 2) ]
names(y) = levels(x)

# network plot

#' Plot a histogram
#' @png
#' @get /plot7
test7 <- function(){
  ob= ggnet2(net, color = "party", palette = y, alpha = 0.75, size = 4, edge.alpha = 0.5)
  print(ob)}



#' Plot a histogram
#' @png
#' @get /plot8
test8 <- function(){
  oi=ggnet2(net, color = "party", palette = y, alpha = 0.75, size = 4, edge.alpha = 0.5,
       edge.color = c("color", "grey50"), label = c("BrunoLeRoux", "nk_m"), label.size = 4)
  print(oi)
}



# Use igraph to make the graph and find membership
karate <- make_graph("Zachary")
wc <- cluster_walktrap(karate)
members <- membership(wc)

# Convert to object suitable for networkD3
karate_d3 <- igraph_to_networkD3(karate, group = members)

# Create force directed network plot




#' Plot a histogram
#' @serializer html
#' @get /plot9
test9 <- function(){
fa=forceNetwork(Links = karate_d3$links, Nodes = karate_d3$nodes,
             Source = 'source', Target = 'target', NodeID = 'name',
             Group = 'group')
print(fa)}



#' Plot a histogram
#' @serializer html
#' @get /plot10
test10 <- function(){


  # generate data
  nodes <- sg_make_nodes(25) # 20 nodes
  edges <- sg_make_edges(nodes, 50) # 50 edges

de = sigmajs() %>% # initialise
  sg_nodes(nodes, id, label, size) %>% # add nodes
  sg_edges(edges, id, source, target) %>% # add edges
  sg_layout() %>%  # layout
  sg_cluster() %>% # cluster
  sg_drag_nodes() %>% # allows user to drag nodes
  sg_neighbours() # show node neighbours on node click
print(de)
}

####### mongolite

m <- mongo(collection='users', url = "mongodb://julian:Julian12345@ds155243.mlab.com:55243/mirna")

print(m)
m$count()

### aqui funcion para recuperar datos de r

##### al parecer esto lee csv del compu


#' An endpoint to test the API
#'
#' @param q A character string to print back
#' @get /test

function(q=""){
  list(msg = paste0("You entered: '", q, "'"))
}

#' Read a csv
#'
#' @param path The path.
#' @get /csv
#' @csv

function(res, path){
  csv_content <- read_csv(path)
  filename <- tempfile(fileext = ".csv")
  write.csv(csv_content, filename, row.names = FALSE)
  include_file(filename, res, "text/csv")
}
