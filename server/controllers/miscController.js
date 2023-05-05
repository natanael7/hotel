import { dirname } from "../config.js";

import { v4 } from "uuid";

import errorHandler from "../functions/errorHandler.js";
import sendResult from "../functions/sendResult.js";

async function filesUpload(req, res) {
  try {
    // To upload a file you have to move it specifying it's name
    // This function gets the dirname from config and moves the file to the directory renaming with the name from the params
    const uploadFile = (image, path) => {
      image.mv(dirname + path);
    };

    // To create consistency in image path names I created this function
    // This function gets the oldname from the params and parses its extension
    // To parse the extension the function will split the filename into an array
    // As separator for the split function is ".", because extension is always after the dot
    // And the extension is the last element of the array
    // This function will not work properly if the extension has multiple dots
    // After the extension was parsed it attaches it to a new name from the params and returns it
    const imageLinkTemplate = (oldName, newName) => {
      if (typeof oldName != "string")
        return errorHandler(
          `Image Path Template got non-string variable ${oldName}`,
          res
        );
      const nameArr = oldName.split(".");
      const extension = nameArr[nameArr.length - 1];
      return `${newName}.${extension}`;
    };
    // console.log(req.files);
    const files = req.files;

    if (files == null || files == undefined)
      return errorHandler("Files Not Provided", res);

    // The images come as an object of the files
    // So to get the image we destructure the files
    let { images } = files;

    // Next we have to work with an array of files, but if image is only one file
    // The previous function returns the file itself, and not an array with it
    // That's why now we check if it is an array, if it is not we will create an array with himself
    if (!Array.isArray(images)) images = [images];

    // Generating the image paths using the template, and as new name we use un uuid so name's wont coincide in the folder
    const imagePaths = images.map((el, i) => imageLinkTemplate(el.name, v4()));

    // Uploading the images to the server, with the new image name
    images.map((image, i) => uploadFile(image, imagePaths[i]));

    return sendResult(imagePaths, res);
  } catch (error) {
    errorHandler(error, res);
  }
}
export { filesUpload };
