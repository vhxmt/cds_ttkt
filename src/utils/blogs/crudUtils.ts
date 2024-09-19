import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { BlogPost } from '@/interfaces/blogs/interface';

// Read data from the JSON file
export const readData = (filePath: string): BlogPost[] => {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(fileData);
    return parsedData?.blogPosts || []; // Ensure 'blogPosts' key is checked
};

// Write data to the JSON file
export const writeData = (filePath: string, data: BlogPost[]): void => {
    const jsonData = JSON.stringify({ blogPosts: data }, null, 2); // 'blogPosts' key
    fs.writeFileSync(filePath, jsonData, 'utf8');
};

// Delete image file
export const deleteImage = (imageFolderPath: string, imageUrl: string) => {
    const imageName = path.basename(imageUrl);
    const fullPath = path.join(imageFolderPath, imageName);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log(`Deleted image: ${imageName}`);
    } else {
        console.log(`Image not found: ${imageName}`);
    }
};

// Get all blog posts
export const getAllItems = (filePath: string): NextResponse => {
    try {
        const data = readData(filePath);
        return NextResponse.json({ blogPosts: data });
    } catch (error) {
        console.error('Error reading data:', error);
        return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
    }
};

// Add a new blog post
export const addItem = async (req: NextRequest, filePath: string): Promise<NextResponse> => {
    try {
        const body = await req.json();
        const newPost: BlogPost = { id: new Date().toISOString(), ...body.newPost };

        if (!newPost.title) {
            return NextResponse.json({ message: 'Invalid request. Title is required.' }, { status: 400 });
        }

        const data = readData(filePath);
        data.unshift(newPost); // Add the new post at the start of the list
        writeData(filePath, data);

        return NextResponse.json({ message: 'Blog post added successfully', post: newPost }, { status: 201 });
    } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
};

// Update an existing blog post
export const updateItem = async (req: NextRequest, filePath: string, imageFolderPath: string): Promise<NextResponse> => {
    const body = await req.json();
    const { id, updatedPost } = body;

    if (!id || !updatedPost || !updatedPost.title) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const data = readData(filePath);
    const postIndex = data.findIndex((post) => post.id === id);

    if (postIndex === -1) {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    const oldPost = data[postIndex];
    if (oldPost.imageUrl && oldPost.imageUrl !== updatedPost.imageUrl) {
        deleteImage(imageFolderPath, oldPost.imageUrl); // Delete the old image
    }

    data[postIndex] = { ...oldPost, ...updatedPost };
    writeData(filePath, data);

    return NextResponse.json({ message: 'Post updated successfully', post: updatedPost }, { status: 200 });
};

// Delete a blog post by ID
export const deleteItem = async (req: NextRequest, filePath: string, imageFolderPath: string): Promise<NextResponse> => {
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const data = readData(filePath);
    const postIndex = data.findIndex((post) => post.id === id);

    if (postIndex === -1) {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    const postToDelete = data[postIndex];
    if (postToDelete.imageUrl) {
        deleteImage(imageFolderPath, postToDelete.imageUrl); // Delete the image
    }

    data.splice(postIndex, 1); // Remove the post
    writeData(filePath, data);

    return NextResponse.json({ message: 'Post deleted successfully' });
};
