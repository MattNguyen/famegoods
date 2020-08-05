import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon, InlineIcon } from '@iconify/react';

export default function profileHeader() {
    return (
        <div>
            <div className="flex">
                <img className="h-12 w-12 object-cover rounded-full border-solid border-white border-2"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                    alt="Woman Profile Picture"></img>
                <div>
                    <p className="ml-4 text-extrabold tracking-wide text-white text-lg align-text-top">Jennifer Tran</p>
                    <p className="ml-4 text-extrabold tracking-wide text-white text-sm align-text-top">3 Hours Ago</p>
                </div>
            </div>
        </div>
    );
}