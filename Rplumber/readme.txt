library(plumber)
r <- plumb("julian.R")  # Where 'plumber.R' is the location of the file shown above
r$run(port=8000)


imagen docker original
sudo docker pull bioconductor/devel_base2

para actualizar docker.. en la carpeta donnde este el dockerfile
sudo docker build -t newbio .

para correr con docker
sudo docker run --rm -p 8000:8000 -v $(pwd):/mnt newbio:latest