import matplotlib
from matplotlib import image
#from matplotlib import pyplot as plt
import numpy as np

# size of a single tile
w, h = 32, 32

# size of the whole board
n, m = 20, 20
W, H = n*w, m*h
im = np.random.rand(W, H, 3) / 10
for i in range(n):
    for j in range(m):
        #v = (i + j) % 2
        #v = np.random.rand(3) / 10
        v = ((i + j) % 2) / 10
        im[32*i:32*(i+1), 32*j:32*(j+1)] += v
image.imsave('images/background.png', im)

# generate the move square
im2 = np.zeros((w, h, 4))
im2[:, :, 1] = 1
im2[:, :, -1] = 0.1
image.imsave('images/move.png', im2)
