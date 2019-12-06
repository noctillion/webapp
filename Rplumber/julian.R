# myfile.R
setwd(system("pwd", intern = T) )

library(pcr)
library(ggplot2)
library(cowplot)
library(jsonlite)


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



# Export a data frame
write_json(res, "pcrres_2ju.json")

##knitr::kable(res, caption = 'Table 7: amplification efficiency of c-myc')



#' Plot a histogram
#' @png
#' @get /plot2
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
library(ggplot2)

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


library(magrittr)
library(ggplot2)

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

library(igraph)
library(networkD3)
library(GGally)
library(network)
library(sna)
library(ggplot2)


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


library(igraph)

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


library(sigmajs)

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



