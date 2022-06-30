import { Request, Response, NextFunction } from "express";
import User from "../models/Users";
import { UserRequestInterface } from "../services/Interface/RequestInterface";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    const userSaved = await user.save();
    return res.status(200).json({
      message: userSaved,
    });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().exec();
    return res.status(200).json({
      message: users,
    });
  } catch (error) {
    return res.status(404).send({ error: error });
  }
};

export const getUserbyId = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(200).json({
        message: user,
      });
    }
  } catch (error) {
    return res.status(404).send({ error: error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const payload: Request = <UserRequestInterface>req.body;
    const user = await User.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });
    if (user) {
      return res.status(200).json({
        message: user,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      return res.status(200).json({
        message: user,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

// interface Post {
//     userId: Number;
//     id: Number;
//     title: String;
//     body: String;
// }

// getting all posts
// export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
//     // get some posts
//     let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
//     let posts: [Post] = result.data;
//     return res.status(200).json({
//         message: posts
//     });
// };

// // getting a single post
// export const getPost = async (req: Request, res: Response, next: NextFunction) => {
//     // get the post id from the req
//     let id: string = req.params.id;
//     // get the post
//     let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
//     let post: Post = result.data;
//     return res.status(200).json({
//         message: post
//     });
// };

// // updating a post
// export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
//     // get the post id from the req.params
//     let id: string = req.params.id;
//     // get the data from req.body
//     let title: string = req.body.title ?? null;
//     let body: string = req.body.body ?? null;
//     // update the post
//     let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
//         ...(title && { title }),
//         ...(body && { body })
//     });
//     // return response
//     return res.status(200).json({
//         message: response.data
//     });
// };

// // deleting a post
// export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
//     // get the post id from req.params
//     let id: string = req.params.id;
//     // delete the post
//     let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
//     // return response
//     return res.status(200).json({
//         message: 'post deleted successfully'
//     });
// };

// // adding a post
// export const addPost = async (req: Request, res: Response, next: NextFunction) => {
//     // get the data from req.body
//     let title: string = req.body.title;
//     let body: string = req.body.body;
//     // add the post
//     let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
//         title,
//         body
//     });
//     // return response
//     return res.status(200).json({
//         message: response.data
//     });
// };
