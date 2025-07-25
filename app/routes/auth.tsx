import { useState, useEffect } from "react";
import type { Route } from "../+types/root";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analyzer | Authentication" },
    { name: "description", content: "Login to you account" },
  ];
}

const Auth = () => {
    const{ isLoading, auth } = usePuterStore()
    const location = useLocation()
    const next = location.search.split('next=')[1] || '/';
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])
    

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
        <div className="gradient-border shadow-lg">
            <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                <h1 className="">
                    Welcome to Analyzer
                </h1>
                <h2>
                    Login To Continue Your Job Journey
                </h2>
            
        
        {isLoading ? (
          <button className="auth-button animate-pulse">
            <p>Signing you in ....</p>
          </button>
        ) : (
          <>
            {auth.isAuthenticated ? (
              <button className="auth-button" onClick={() => auth.signOut()}>
                <p>Sign Out</p>
            </button>
            ) : (
              <button className="auth-button" onClick={() => auth.signIn()}>
                <p>Sign In</p>
              </button>
            )}
          </>
        )}
        </section>
        </div>
    </main>
  )
}

export default Auth