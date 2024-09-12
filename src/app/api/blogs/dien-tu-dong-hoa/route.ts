import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Path to the JSON file and images folder
const jsonFilePath = path.join(process.cwd(), 'src/data/blogs/dien-tu-dong-hoa/data.json');
const imageFolderPath = path.join(process.cwd(), 'public/image/blog/dien-tu-dong-hoa');

// Helper function to read the JSON file
function readData() {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    return JSON.parse(jsonData);
}

// Helper function to write to the JSON file
function writeData(data: any) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Helper function to delete image
function deleteImage(imageUrl: string) {
    const imageName = path.basename(imageUrl); // Extract the file name from the URL
    const fullPath = path.join(imageFolderPath, imageName);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath); // Delete the file
        console.log(`Deleted image: ${imageName}`);
    } else {
        console.log(`Image not found: ${imageName}`);
    }
}

// **GET** method to fetch all blog posts
export async function GET(req: NextRequest) {
    const data = readData();  // Read data from the JSON file
    return NextResponse.json(data);  // Return the blog posts in JSON format
}

// **POST** method to add a new blog post
export async function POST(req: NextRequest) {
    const body = await req.json();
    const { newPost } = body;

    if (!newPost || !newPost.title || !newPost.date || !newPost.description || !newPost.imageUrl || !newPost.href) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const data = readData();

    const newPostWithId = {
        ...newPost,
        id: new Date().toISOString(), // ID is based on creation date
    };

    data.blogPosts.unshift(newPostWithId);
    writeData(data);

    return NextResponse.json({ message: 'Blog post added successfully', post: newPostWithId }, { status: 201 });
}

// **PUT** method to edit an existing blog post by ID
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { id, updatedPost } = body;

    if (!id || !updatedPost || !updatedPost.title || !updatedPost.date || !updatedPost.description || !updatedPost.imageUrl || !updatedPost.href) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const data = readData();
    const postIndex = data.blogPosts.findIndex((post: any) => post.id === id);

    if (postIndex === -1) {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    // If the image URL has changed, delete the old image
    const oldPost = data.blogPosts[postIndex];
    if (oldPost.imageUrl && oldPost.imageUrl !== updatedPost.imageUrl) {
        deleteImage(oldPost.imageUrl); // Delete the old image
    }

    data.blogPosts[postIndex] = { ...oldPost, ...updatedPost };
    writeData(data);

    return NextResponse.json({ message: 'Post updated successfully', post: updatedPost }, { status: 200 });
}

// **DELETE** method to delete a blog post by ID
export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const data = readData();
    const postIndex = data.blogPosts.findIndex((post: any) => post.id === id);

    if (postIndex === -1) {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    // Delete the associated image file
    const postToDelete = data.blogPosts[postIndex];
    if (postToDelete.imageUrl) {
        deleteImage(postToDelete.imageUrl); // Delete the image
    }

    data.blogPosts.splice(postIndex, 1); // Remove the post
    writeData(data);

    return NextResponse.json({ message: 'Post deleted successfully' });
}
