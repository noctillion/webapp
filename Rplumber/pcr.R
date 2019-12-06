# install package CRAN
install.packages('pcr')

library(pcr)

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

res

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
res

library(pcr)
library(ggplot2)
library(cowplot)
library(jsonlite)

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

# Export a data frame
write_json(res, "pcrres_1.json")

##knitr::kable(res, caption = 'Table 7: amplification efficiency of c-myc')


f <- function(){
  gg <- pcr_assess(ct3,
                   amount = amount,
                   reference_gene = 'GAPDH',
                   method = 'efficiency',
                   plot = TRUE)
  gg + 
    labs(x = 'log10 amount', y = 'Delta Ct') +
    theme(strip.background = element_blank(),
          strip.text = element_blank())
}

f()








gg <- pcr_assess(ct3,
                 amount = amount,
                 reference_gene = 'GAPDH',
                 method = 'efficiency',
                 plot = TRUE)
gg + 
  labs(x = 'log10 amount', y = 'Delta Ct') +
  theme(strip.background = element_blank(),
        strip.text = element_blank())




## calculate standard curve
res <- pcr_assess(ct3,
                  amount = amount,
                  method = 'standard_curve')
knitr::kable(res, caption = 'Table 8: Standard curves of c-myc and GAPDH')

intercept <- res$intercept
slope <- res$slope

gg <- pcr_assess(ct3,
                 amount = amount,
                 method = 'standard_curve',
                 plot = TRUE)
gg + 
  labs(x = 'Log 10 amount', y = 'CT value')


# default mode delta_delta_ct
## locate and read raw ct data
fl <- system.file('extdata', 'ct1.csv', package = 'pcr')
ct1 <- read.csv(fl)

## add grouping variable
group_var <- rep(c('brain', 'kidney'), each = 6)

# calculate all values and errors in one step
## mode == 'separate_tube' default
res1 <- pcr_analyze(ct1,
                    group_var = group_var,
                    reference_gene = 'GAPDH',
                    reference_group = 'brain')

knitr::kable(res1, caption = 'Table 9: Double delta $C_T$ method (separate tubes)')


# calculate all values and errors in one step
## mode == 'same_tube'
res2 <- pcr_analyze(ct2,
                    group_var = group_var,
                    reference_gene = 'GAPDH',
                    reference_group = 'brain',
                    mode = 'same_tube')

knitr::kable(res2, caption = 'Table 10: Double delta $C_T$ method (same tube)')

gg1 <- pcr_analyze(ct1,
                   group_var = group_var,
                   reference_gene = 'GAPDH',
                   reference_group = 'brain',
                   plot = TRUE) +
  labs(x = '', y = 'Relative mRNA expression') +
  ggtitle(label = 'Separate tubes')

gg2 <- pcr_analyze(ct2,
                   group_var = group_var,
                   reference_gene = 'GAPDH',
                   reference_group = 'brain',
                   mode = 'same_tube',
                   plot = TRUE) +
  labs(x = '', y = 'Relative mRNA expression') +
  ggtitle(label = 'Same tubes')

plot_grid(gg1, gg2)

## example to check fold change of control gens
## locate and read file
fl <- system.file('extdata', 'ct1.csv', package = 'pcr')
ct1 <- read.csv(fl)

## make a data.frame of two identical columns
pcr_hk <- data.frame(
  GAPDH1 = ct1$GAPDH,
  GAPDH2 = ct1$GAPDH
)

## add grouping variable
group_var <- rep(c('brain', 'kidney'), each = 6)
# delta_ct method
## calculate caliberation
res <- pcr_analyze(pcr_hk,
                   group_var = group_var,
                   reference_group = 'brain',
                   method = 'delta_ct')

knitr::kable(res, caption = 'Table 11: Delta $C_T$ method')

pcr_analyze(pcr_hk,
            group_var = group_var,
            reference_group = 'brain',
            method = 'delta_ct', 
            plot = TRUE) +
  theme(legend.position = 'top',
        legend.direction = 'horizontal') +
  labs(x = '', y = 'Relative fold change')

## calculate standard amounts and error
res1 <- pcr_analyze(ct1,
                    group_var = group_var,
                    reference_gene = 'GAPDH',
                    reference_group = 'brain',
                    intercept = intercept,
                    slope = slope,
                    method = 'relative_curve')

knitr::kable(res1, caption = 'Table 12: Standard curve method (separate tubes)')

## calculate standard amounts and error
res2 <- pcr_analyze(ct2,
                    group_var = group_var,
                    reference_gene = 'GAPDH',
                    reference_group = 'brain',
                    intercept = intercept,
                    slope = slope,
                    method = 'relative_curve',
                    mode = 'same_tube')

knitr::kable(res2, caption = 'Table 13: Standard curve method (same tube)')


gg1 <- pcr_analyze(ct1,
                   group_var = group_var,
                   reference_gene = 'GAPDH',
                   reference_group = 'brain',
                   intercept = intercept,
                   slope = slope,
                   method = 'relative_curve',
                   plot = TRUE) +
  labs(x = '', y = 'Relative mRNA expression') +
  ggtitle(label = 'Separate tubes')


gg2 <- pcr_analyze(ct2,
                   group_var = group_var,
                   reference_gene = 'GAPDH',
                   reference_group = 'brain',
                   intercept = intercept,
                   slope = slope,
                   method = 'relative_curve',
                   mode = 'same_tube',
                   plot = TRUE) +
  labs(x = '', y = 'Relative mRNA expression') +
  ggtitle(label = 'Same tubes')

plot_grid(gg1, gg2)

# locate and read data
fl <- system.file('extdata', 'ct4.csv', package = 'pcr')
ct4 <- read.csv(fl)

# make group variable
group <- rep(c('control', 'treatment'), each = 12)

# analyze the testing data
res <- pcr_analyze(ct4, 
                   group_var = group,
                   reference_gene = 'ref',
                   reference_group = 'control')


ggplot(res, aes(x = group, y = relative_expression)) +
  geom_col() +
  labs(x = '', y = 'Relative mRNA expression')


# test using t-test
tst1 <- pcr_test(ct4,
                 group_var = group,
                 reference_gene = 'ref',
                 reference_group = 'control',
                 test = 't.test')

knitr::kable(tst1, caption = 'Table 14: t-test summary')


# test using wilcox.test
tst2 <- pcr_test(ct4,
                 group_var = group,
                 reference_gene = 'ref',
                 reference_group = 'control',
                 test = 'wilcox.test')

knitr::kable(tst2, caption = 'Table 15: Wilcoxon test summary')

# testing using lm
tst3 <- pcr_test(ct4,
                 group_var = group,
                 reference_gene = 'ref',
                 reference_group = 'control',
                 test = 'lm')

knitr::kable(tst3, caption = 'Table 16: Linear regression summary')

