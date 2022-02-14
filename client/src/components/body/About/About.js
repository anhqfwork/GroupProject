import { Avatar } from "@mui/material";
import React from "react";
import './About.css'

function About() {
    return (
        <div className="about-container">
            <h3 className="aboutus">About Us</h3>
            <div className="aboutus-container">
                <div className="about-flex">
                    <div className="about-header">
                        <Avatar
                            src="https://images.unsplash.com/photo-1577058005446-f4380dcc4e08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
                            sx={{ width: 350, 
                                height: 350, 
                                margin:'0 auto', 
                                border: '8px solid var(--clr-pri-light)' }}
                        />
                    </div>
                    <div className="about-content">
                        <h3>about our shop</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
                <div className="about-flex">
                    <div className="about-content">
                        <h3>about our books</h3>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    </div>
                    <div className="about-header">
                        <Avatar
                            src="https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                            sx={{ width: 350, 
                                height: 350, 
                                margin:'0 auto', 
                                border: '8px solid var(--clr-pri-light)' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About