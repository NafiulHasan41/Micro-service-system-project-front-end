import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="w-full min-h-screen bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <section className="flex flex-col sm:flex-row items-center w-full h-screen bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-400 text-white px-6">
                {/* Content */}
                <div className="flex-1 flex flex-col items-center justify-center text-left space-y-6">
                    <h1 className="text-5xl text-center font-extrabold leading-tight">
                        Empowering Communities through <br /> Microjobs & More
                    </h1>
                    <p className="text-lg max-w-xl">
                        Our platform connects individuals with opportunities in microjobs, volunteering, entrepreneurship, and microfinance. Discover a world of possibilities and make a difference in your community today.
                    </p>
                    <div className="flex gap-4">
                        <Button
                            size="lg"
                            className="bg-white text-indigo-500 font-bold hover:bg-gray-200"
                        >
                            Get Started
                        </Button>
                        <Link href="#mission" className="no-underline">
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-white border-white bg-indigo-500 hover:bg-white hover:text-indigo-500"
                                
                            >
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Image */}
                <div className="flex-1 flex justify-center items-center">
                    <Image
                        src="/microjobs.png"
                        alt="Empowering Communities"
                        width={400}
                        height={400}
                        className="rounded-lg shadow-xl transform scale-100 hover:scale-105 transition-transform duration-500 w-[150px] sm:w-[300px] md:w-[400px] h-auto"
                    />
                </div>
            </section>

            {/* Mission and Vision Section */}
            <section id="mission" className="py-12 bg-gray-100">
    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
        <div className="shadow-lg p-8 rounded-lg bg-white transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <h2 className="text-4xl font-bold mb-6 text-blue-600">Our Mission</h2>
            <p className="text-lg leading-relaxed">Our mission is to empower individuals by providing access to flexible, part-time, and community-focused opportunities. We aim to reduce unemployment, enhance skills, and foster economic independence by connecting people with relevant tasks and services.</p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
                <li className="transition-all transform hover:translate-x-2 ease-in-out duration-300">Bridging the gap between job seekers and task providers.</li>
                <li className="transition-all transform hover:translate-x-2 ease-in-out duration-300">Promoting economic growth through local community engagement.</li>
                <li className="transition-all transform hover:translate-x-2 ease-in-out duration-300">Encouraging collaboration and resource sharing for mutual benefit.</li>
            </ul>
        </div>
        <div className="shadow-lg p-8 rounded-lg bg-white transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <h2 className="text-4xl font-bold mb-6 text-blue-600">Our Vision</h2>
            <p className="text-lg leading-relaxed">We envision a world where every individual has the tools and opportunities to pursue meaningful work, enhancing personal growth and community well-being. Our platform seeks to be a catalyst for positive change, empowering people to achieve their full potential.</p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
                <li className="transition-all transform hover:translate-x-2 ease-in-out duration-300">Fostering a global network of engaged, resourceful citizens.</li>
                <li className="transition-all transform hover:translate-x-2 ease-in-out duration-300">Creating scalable and sustainable economic solutions.</li>
                <li className="transition-all transform hover:translate-x-2 ease-in-out duration-300">Championing inclusivity and accessibility for all users.</li>
            </ul>
        </div>
    </div>
</section>




            {/* How It Works Section */}
            <section className="bg-gray-100 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Task Posters</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Easily post tasks and jobs that need to be done.</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Taskers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Find and complete jobs that match your preferences.</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Community Service</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Engage in volunteer opportunities to give back to your community.</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Micropreneurs Platform</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Place for Small business owners to showcase and sell their products or services.</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Microfinance Service</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Small loans for entrepreneurs to start or expand their business.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Core Features Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Core Features</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Job Recommendations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Personalized suggestions for relevant tasks using advanced algorithms.</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Location-Based Matching</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Prioritize tasks near your location for convenience.</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>PWA Functionality</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Access offline, receive push notifications, and more.</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Secure Payments</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Ensure financial safety with trusted payment systems.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="bg-gray-100 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-4xl font-bold">20+</h3>
                            <p className="text-lg">Tasks Completed</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold">10+</h3>
                            <p className="text-lg">Active Users</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold">40+</h3>
                            <p className="text-lg">Community Hours</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Asif Mahmud</CardTitle>
                                <CardDescription>Role (e.g., Frontend Developer(Chatgpt))</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Passionate about solving real-world problems through Chatgpt.</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Nafiul Hasan</CardTitle>
                                <CardDescription>Role (e.g., Backend Developer)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Dedicated to building robust and scalable backend systems.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-blue-500 to-indigo-400 text-white py-16 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-4">Ready to join us?</h2>
                    <p className="text-xl mb-6">Sign up today and start your journey with us!</p>
                    <Button className="bg-white text-blue-500 hover:bg-gray-100">Sign Up</Button>
                </div>
            </section>
        </div>
    );
}