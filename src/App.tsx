// # VolleyDevByMaubry [4/4] "En la interacción nace la creación, y en la creación, un reflejo del alma del programador."

import React, { useState } from 'react';
import { parseUI } from './lib/parser';
import { renderUI } from './lib/renderer';

export default function App() {
  const [input, setInput] = useState<string>(`Container width=100% bgColor="#eef2f7" padding="4 0"
    # Header Section
    Container width="90%" margin="0 auto" padding=6 bgColor=white rounded=lg shadow=md
        Title "Welcome to VolleyUI Showcase!" align=center textColor="#1a202c"
        Text "A comprehensive demo of components and general styling attributes." align=center textColor=gray-600 margin="0 0 6 0"
        Icon name=rocket color=orange size=32 align=center # Illustrative, align on Icon itself is not directly supported by current Icon.tsx, but on a wrapper
    
    # Main Page Layout (Content + Sidebar)
    Container width="90%" margin="6 auto" # This will be a flex container for content and sidebar
        # Main Content Area (e.g., a form) - Takes 2/3 width
        Container width="65%" padding=6 bgColor=white rounded=lg shadow=md margin="0 2% 0 0" # margin-right for spacing
            Title "Registration Form" textColor=blue-700 margin="0 0 6 0"
            
            Input type=text placeholder="Enter your full name" name=fullname width=100% padding=3 margin="0 0 4 0" rounded=md
            Input type=email placeholder="Your Email Address" name=user_email width=100% padding=3 margin="0 0 4 0" rounded=md
            Input value="Pre-filled Text" type=text width=100% padding=3 margin="0 0 4 0" rounded=md bgColor="#f0f0f0" textColor="#555"
            
            Checkbox "I agree to the Terms and Conditions" name=agreeTerms checked=true margin="0 0 4 0"
            
            RadioGroup "Preferred Contact Method" name=contactMethod margin="0 0 4 0" padding=3 rounded=md border-radius="md" bgColor="#fafafa"
                Radio "Email" value=email_contact checked=true
                Radio "Phone" value=phone_contact
                Radio "No Contact" value=none
            
            Select "Topic of Interest" name=topic margin="0 0 6 0" label="Select a Topic:" width=100% padding=3 rounded=md
                Option "General Inquiry" value=general
                Option "Support Request" value=support selected=true
                Option "Product Feedback" value=feedback
                Option "Careers" value=careers disabled=true
            
            Container align=center # To center buttons
                Button "Submit Application" color=green shadow=md rounded=lg padding="3 6" textColor=white
                Button "Reset Form" color=gray shadow=sm rounded=lg padding="3 6" margin="0 0 0 4"

        # Sidebar Area - Takes 1/3 width
        Container width="33%" padding=6 bgColor="#f9fafb" rounded=lg shadow=md
            Title "Quick Info" textColor="#374151" size=xl margin="0 0 4 0"
            Text "This section demonstrates various visual elements available in VolleyCodeUI." textColor=gray-700 size=sm margin="0 0 4 0"
            
            Image src="https://via.placeholder.com/250x150.png?text=VolleyUI+Demo" alt="Placeholder Image" width=100% height=auto rounded=md shadow=sm margin="0 0 4 0"
            
            Container padding=3 bgColor=white rounded=md shadow=xs
                Tag "New Feature!" color=purple size=sm margin="0 0 2 0"
                Tag "Beta" color=yellow size=sm margin="0 0 2 0"
                Tag "Info" color=blue size=sm
            
            Container margin="4 0 0 0" padding=3 align=center
                Icon name=star color="#FFD700" size=28
                Icon name=heart color=red size=28 margin="0 0 0 2"
                Icon name=check-circle color=green size=28 margin="0 0 0 2"

    # Footer Section
    Container width=100% padding="6 0" align=center margin="8 0 0 0" bgColor="#2d3748"
        Text "© 2024 VolleyCodeUI. All rights reserved. Text-to-UI generation made easy." textColor=gray-300 size=sm
        Container margin="2 0 0 0"
            Tag "Volley" color=blue size=xs
            Tag "Magic" color=pink size=xs margin="0 0 0 1"
`);

  const elements = parseUI(input);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Taskflow UI - VolleyDevByMaubry</h1>

      <textarea
        className="w-full max-w-4xl h-96 p-4 rounded border border-gray-300 mb-6 resize-none font-mono text-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
      />

      <div className="w-full max-w-5xl p-4 border rounded-lg shadow-xl bg-white">
        {renderUI(elements)}
      </div>
    </div>
  );
}
