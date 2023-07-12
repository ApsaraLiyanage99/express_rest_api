// to access json file and react content
const { log } = require("console");
const fs = require("fs");
const path = require("path");

const SAMPLE_POSTS = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../tests/data/posts.json"))
);
//when we reading a file using `fs` library, it returns a byte array
// we have to pass this byte array to a json structure using `JSON.parse`

// we need to `get` all the posts in this app
const getAllPosts = (req, res) => {
  res.status(200).json({
    status: "success",
    data: SAMPLE_POSTS,
  });
};

// we need to `get` specific posts in this app
const getPostById = (req, res) => {
  console.log(req.params.id); //reading request parameter value; as string type
  const id = req.params.id * 1; //type cast string value to a integer valuea automatically

  // 1) check the post
  const post = SAMPLE_POSTS.find((item) => item.id === id); //find is a higher order function equal to searching with loop
  console.log(post); //console.log for the terminal output

  // 2) check whether the post exists or not
  if (!post) {
    return res.status(404).json({
      status: "fail",
      message: "Post not found",
    });
  }

  // 3) If it exists, then return the post
  return res.status(200).json({
    status: "success",
    data: post,
  });
};

//----------------------------------------------------------------------------
//function to create new posts

const createPost = (req, res) => {
  console.log(req.body);

  // 1) create a json object

  //generate id for the post
  const newId = SAMPLE_POSTS[SAMPLE_POSTS.length - 1].id + 1;

  const newPost = Object.assign({
    //create new object
    id: newId,
    title: req.body.title,
    content: req.body.content,
    createdAt: Date.now(),
  });

  console.log(newPost);

  //push the new object to the SAMPLE_POSTS array
  SAMPLE_POSTS.push(newPost);

  // 2) save the object
  fs.writeFile(
    path.resolve(__dirname, "../../tests/data/posts.json"),
    JSON.stringify(SAMPLE_POSTS), //opposite of JSON.parse
    () => {
      return res.status(200).json({
        status: "success",
        data: newPost, // 3) return the newly created object back to the user
      });
    }
  );
  //write to the file(file path, data, callback funtion)
};

//-----------------------------------------------------------------------------
//function to update posts

const updatePost = (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  // 1) check whether the post exists or not
  const id = req.params.id * 1; //type cast string value to a integer valuea automatically

  const post = SAMPLE_POSTS.find((item) => item.id === id); //find is a higher order function equal to searching with loop
  //console.log(post); //console.log for the terminal output

  // 2) if it is not exists, then return error
  if (!post) {
    return res.status(404).json({
      status: "fail",
      message: "Post not found",
    });
  }


  //3) if it is exists, then update the post
  const updatedPosts = SAMPLE_POSTS.map(item => {   //map is also higher order function that equal to loop through each item
    if(item.id ===id) {     //if found an item with this id, it returns new json object
      return {         
        ...item,                //populated with all the old values
        title: req.body.title,    //it updates title
        content: req.body.content,   //it updates content
        createdAt: Date.now()        //it updates latest created at date
      }
    }
    return item         //if not found such an item, return existing array without updating
  })
  console.log(updatedPosts);


  // 4) save the updated post
  fs.writeFile(
    path.resolve(__dirname, "../../tests/data/posts.json"),
    JSON.stringify(updatedPosts), //opposite of JSON.parse
    () => {
      return res.status(200).json({
        status: "success",
        message: "Post is updated" 
      });
    }
  );
};


//------------------------------------------------------------------------------------------
//function to delete posts

const deletePost = (req, res) => {
  // 1) check whether the post exists or not
  const id = req.params.id * 1; //type cast string value to a integer valuea automatically

  const post = SAMPLE_POSTS.find((item) => item.id === id); //find is a higher order function equal to searching with loop
  //console.log(post); //console.log for the terminal output

  // 2) if it is not exists, then return error
  if (!post) {
    return res.status(404).json({
      status: "fail",
      message: "Post not found",
    });
  }

  //3) if it is exists, then update the post
  const updatedPosts = SAMPLE_POSTS.map(item => {   //map is also higher order function that equal to loop through each item
    if(item.id !==id) {           
      return item         //if not found such an item, return existing array without updating
    }
  })
  console.log(updatedPosts);
  
  // 4) save the updated post
  fs.writeFile(
    path.resolve(__dirname, "../../tests/data/posts.json"),
    JSON.stringify(updatedPosts), //opposite of JSON.parse
    () => {
      return res.status(200).json({
        status: "success",
        message: "Post is deleted" 
      });
    }
  );
};



module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };

// installed packages
// fs->access to our file system and read specific files from directory
// path->we can use to resolve directory naming etc
