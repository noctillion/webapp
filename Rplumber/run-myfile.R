#!/usr/bin/env Rscript

library(plumber)
pr <- plumb('julian.R')
pr$run(host = "0.0.0.0", port = 8000)
