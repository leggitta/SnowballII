import matplotlib
from matplotlib import image
#from matplotlib import pyplot as plt
import numpy as np

# size of a single tile
w, h = 64, 64

# size of the whole board
n, m = 40, 40
W, H = n*w, m*h
im = np.random.rand(W, H, 3) / 10
for i in range(n):
    for j in range(m):
        #v = (i + j) % 2
        #v = np.random.rand(3) / 10
        _i = slice(w*i, w*(i+1))
        _j = slice(h*j, h*(j+1))
        v = ((i + j) % 2) / 10
        im[_i, _j] += v
        im[_i, _j, 0] += 0.1 * np.sin(2*np.pi*i/n) + 0.1
        im[_i, _j, 2] += 0.1 * np.cos(2*np.pi*j/m) + 0.1

image.imsave('images/background.png', im)

# generate the move square
n, m = 13, 13
im2 = np.ones((n*w, m*h, 4))
im2[:, :, 0] = 0.5
im2[:, :, 2] = 0.5
im2[:, :, 3] = 0.3
'''
im2 = np.zeros((n*w, m*h, 4))
for i in range(n):
    for j in range(m):
        # compute radius from center
        r = np.sqrt((i-6)**2 + (j-6)**2)
        #r = np.abs(i-6) + np.abs(j-6)
        if r <= 6:
            im2[w*i:w*(i+1), h*j:h*(j+1)] = [0, 1, 0, 0.1]
'''
image.imsave('images/move.png', im2)

# generate the pointer
n, m = 1, 1
im3 = np.ones((n*w, m*h, 4))
im3[:, :, -1] = 0.3
image.imsave('images/pointer.png', im3)
