# Image gallery

The image gallery is a simple Single Page Application where users can see a list of albums which is simply a text based list. Users can select an album which will navigate them to a page where all the images relevant to that album are displayed.

## Goals
1. Fix the bugs in the code. (Also must resolve any warnings that show up in the debugger console)
2. Make Album list dynamic using the [placeholder api](https://jsonplaceholder.typicode.com/albums)
3. Make Gallery dynamic using the [photos api](https://jsonplaceholder.typicode.com/photos)
4. Add test files for both album and image gallery components. Test must verify that both components displays all/just the data api provides them. (service should be mocked)
5. Fix any typos and general mistakes
6. Improve the styling of both components to match the screenshots below

\
*Album Design*
\
![Album Design](/src/img/Album.png)

\
*Add New Album Design*
\
![Add New Album Design](/src/img/AddNewAlbum.png)

\
*Gallery Design*
\
![Gallery Design](/src/img/Gallery.png)

## Note
- You can use either `axios` or `rtk query` to perform api requests.
- Styling of components can be performed by either writing raw `.css` files or using `styled component` module.
- For ading items to the album, you're expected to write code that can send data to an external API, but it is not required that it's used or works.
