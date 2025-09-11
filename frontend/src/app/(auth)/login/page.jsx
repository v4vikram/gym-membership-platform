"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
Dumbbell,
Eye,
EyeOff,
Mail,
Lock,
User,
ArrowRight,
ArrowLeft,
Check,
Shield,
Heart,
MailIcon,
LockIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Checkbox } from "@/components/ui/checkbox";
import {useAuthStore} from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

// Yup validation schemas
const loginSchema = Yup.object().shape({
email: Yup.string().email("Invalid email").required("Email is required"),
password: Yup.string()
.min(6, "Password must be at least 6 characters")
.required("Password is required"),
});

const registerSchema = Yup.object().shape({
name: Yup.string().required("Full name is required"),
email: Yup.string().email("Invalid email").required("Email is required"),
password: Yup.string()
.min(6, "Atleast 6 characters")
.required("Password is required"),
confirmPassword: Yup.string()
.oneOf([Yup.ref("password")], "Passwords must match")
.required("Confirm password"),
agreeTerms: Yup.boolean().oneOf([true], "You must accept terms"),
});

const GymPassAuth = () => {
const [currentPage, setCurrentPage] = useState("welcome"); // 'welcome', 'login', 'register', 'success'
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const { login, register, loading, error } = useAuthStore();
const router = useRouter()


const renderWelcomePage = () => (
<div className="animate-in fade-in duration-500">
{/* Hero Section */}
<div className="relative overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-pink-500 text-white px-6 py-12 mb-8 rounded-b-3xl">
<div className="relative z-10 text-center">
<div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
<Dumbbell className="w-10 h-10" />
</div>
<h1 className="text-3xl font-bold mb-2">Welcome to GymPass</h1>
<p className="text-lg opacity-90 mb-6">
Your fitness journey starts here
</p>

{/* Animated Features */}
<div className="flex justify-center space-x-6 mb-6">
{["🏋️‍♂️", "🧘‍♀️", "🏊‍♂️"].map((emoji, index) => (
<div
key={index}
className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl animate-bounce"
style={{ animationDelay: `${index * 0.2}s` }}
>
{emoji}
</div>
))}
</div>
</div>

{/* Background Pattern */}
<div className="absolute inset-0 opacity-10">
<div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-pulse" />
<div
className="absolute top-32 right-16 w-16 h-16 border-2 border-white rounded-full animate-pulse"
style={{ animationDelay: "1s" }}
/>
<div
className="absolute bottom-20 left-16 w-12 h-12 border-2 border-white rounded-full animate-pulse"
style={{ animationDelay: "2s" }}
/>
</div>
</div>

{/* Stats Grid */}
{/* <div className="px-6 mb-8">
       <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Why Choose GymPass?</h2>
       <div className="grid grid-cols-2 gap-4">
         {stats.map((stat, index) => {
           const IconComponent = stat.icon;
           return (
             <div 
               key={index}
               className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
               style={{ animationDelay: `${index * 0.1}s` }}
             >
               <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mb-3`}>
                 <IconComponent className="w-5 h-5 text-white" />
               </div>
               <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
               <p className="text-sm text-gray-600">{stat.label}</p>
             </div>
           );
         })}
       </div>
     </div> */}

{/* Testimonial */}
{/* <div className="px-6 mb-8">
       <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-primary">
         <div className="flex items-center mb-4">
           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
             <User className="w-6 h-6 text-primary" />
           </div>
           <div>
             <p className="font-semibold text-gray-800">Sarah Johnson</p>
             <div className="flex text-yellow-400">
               {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
             </div>
           </div>
         </div>
         <p className="text-gray-600 italic">"GymPass transformed my fitness routine. Access to multiple gyms with one membership is amazing!"</p>
       </div>
     </div> */}

{/* CTA Buttons */}
<div className="px-6 space-y-4">
<Button onClick={() => setCurrentPage("register")} className="">
<span>Get Started</span>
<ArrowRight className="w-5 h-5" />
</Button>

<Button onClick={() => setCurrentPage("login")} variant={"destructive"}>
Sign In
</Button>
</div>

{/* Trust Indicators */}
<div className="px-6 pt-8 pb-4">
<div className="flex justify-center items-center space-x-6 text-gray-400">
<div className="flex items-center space-x-2">
<Shield className="w-4 h-4" />
<span className="text-sm">Secure</span>
</div>
{/* <div className="flex items-center space-x-2">
           <Smartphone className="w-4 h-4" />
           <span className="text-sm">Mobile First</span>
         </div> */}
<div className="flex items-center space-x-2">
<Heart className="w-4 h-4" />
<span className="text-sm">Trusted</span>
</div>
</div>
</div>
</div>
);

// -----------------
// LOGIN PAGE
// -----------------
const renderLoginPage = () => (
<Formik
initialValues={{ email: "", password: "" }}
validationSchema={loginSchema}
onSubmit={async (values, { setErrors }) => {

try {
const loginRes = await login(values);

console.log("loginRes", loginRes)

if (loginRes.status === 200) {
setCurrentPage("success");

const intervalId = setInterval(() => {
clearInterval(intervalId); // stop it after first run
              router.replace(`dashboard`)
              router.replace(`/dashboard/membership`)

}, 3000);
}


} catch (e) {
console.log("e.response?.data?.errors", e.response?.data?.errors)
setErrors(e.response?.data?.errors)
console.error("Register failed", e.response.data.errors, error);
}

}}
>
{({ isSubmitting }) => (
<Form className="animate-in slide-in-from-right duration-300 space-y-6">
{/* Header */}
<div className="flex items-center justify-between mb-6">
<button
type="button"
onClick={() => setCurrentPage("welcome")}
className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
>
<ArrowLeft className="w-5 h-5" />
</button>
<h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
<div className="w-10" />
</div>

{/* Email */}
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">
Email
</label>
<div className="relative">
<Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
<Field
as={Input}
name="email"
type="email"
className="w-full bg-gray-50 border-2 rounded-2xl py-4 px-12 focus:ring-2 focus:ring-primary"
placeholder="Enter your email"
/>
</div>
<ErrorMessage
name="email"
component="p"
className="text-red-500 text-sm mt-1"
/>
</div>

{/* Password */}
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">
Password
</label>
<div className="relative">
<Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
<Field
as={Input}
name="password"
type={showPassword ? "text" : "password"}
className="w-full bg-gray-50 border-2 rounded-2xl py-4 px-12 pr-12 focus:ring-2 focus:ring-primary"
placeholder="Enter your password"
/>
<button
type="button"
onClick={() => setShowPassword(!showPassword)}
className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
>
{showPassword ? (
<EyeOff className="w-5 h-5" />
) : (
<Eye className="w-5 h-5" />
)}
</button>
</div>
<ErrorMessage
name="password"
component="p"
className="text-red-500 text-sm mt-1"
/>
</div>

{/* Submit */}
<Button type="submit" disabled={isSubmitting || isLoading}>
{isSubmitting || isLoading ? "Signing in..." : "Sign In"}
</Button>

{/* Link */}
<p className="text-center text-sm text-gray-600">
Don’t have an account?{" "}
<button
type="button"
onClick={() => setCurrentPage("register")}
className="text-primary font-medium hover:underline"
>
Sign Up
</button>
</p>
</Form>
)}
</Formik>
);

// -----------------
// REGISTER PAGE
// -----------------
const renderRegisterPage = () => (
<Formik
initialValues={{
name: "",
email: "",
password: "",
confirmPassword: "",
agreeTerms: false,
}}
validationSchema={registerSchema}
onSubmit={async (values, { setErrors }) => {
console.log("Register values", values);

try {
const registerRes = await register(values)

if (registerRes.status === 201) {
setCurrentPage("success");

const intervalId = setInterval(() => {
setCurrentPage("login");
clearInterval(intervalId); // stop it after first run
}, 3000);
}


} catch (e) {
console.log("e.response?.data?.errors", e.response?.data?.errors)
setErrors(e.response?.data?.errors)
console.error("Register failed", e.response.data.errors, error);
}

}}
>
{({ isSubmitting }) => (
<Form className="animate-in slide-in-from-right duration-300 space-y-5">
{/* Header */}
<div className="flex items-center justify-between mb-6">
<button
type="button"
onClick={() => setCurrentPage("welcome")}
className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
>
<ArrowLeft className="w-5 h-5" />
</button>
<h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
<div className="w-10" />
</div>

{/* Full Name */}
<div>
<label
htmlFor="name"
className="block text-sm font-medium text-gray-700 mb-1"
>
Full Name
</label>
<div className="relative">
<User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
<Field
as={Input}
id="name"
name="name"
type="text"
placeholder="Enter your name"
className="pl-12"
/>
</div>
<ErrorMessage
name="name"
component="p"
className="text-red-500 text-sm mt-1"
/>
</div>

{/* Email */}
<div>
<label
htmlFor="email"
className="block text-sm font-medium text-gray-700 mb-1"
>
Email
</label>
<div className="relative">
<MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
<Field
as={Input}
id="email"
name="email"
type="email"
placeholder="Enter your email"
/>
</div>

<ErrorMessage
name="email"
component="p"
className="text-red-500 text-sm mt-1"
/>
</div>

{/* Password */}
<div className="relative">
<label
htmlFor="password"
className="block text-sm font-medium text-gray-700 mb-1"
>
Password
</label>
<div className="relative">
<LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
<Field
as={Input}
id="password"
name="password"
type={"password"}
placeholder="Enter password"
className="pr-12"
/>
</div>

<ErrorMessage
name="password"
component="p"
className="text-red-500 text-sm mt-1"
/>
</div>

{/* Confirm Password */}
<div className="relative">
<label
htmlFor="confirmPassword"
className="block text-sm font-medium text-gray-700 mb-1"
>
Confirm Password
</label>
<div className="relative">
<LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
<Field
as={Input}
id="confirmPassword"
name="confirmPassword"
type={showConfirmPassword ? "text" : "password"}
placeholder="Confirm password"
className="pr-12"
/>
</div>

<button
type="button"
aria-label={
showConfirmPassword ? "Hide confirm password" : "Show confirm password"
}
onClick={() => setShowConfirmPassword(!showConfirmPassword)}
className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
>
{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
</button>
<ErrorMessage
name="confirmPassword"
component="p"
className="text-red-500 text-sm mt-1"
/>
</div>

{/* Terms */}
<div className="flex items-center space-x-2">
<Field
type="checkbox"
id="agreeTerms"
name="agreeTerms"
/>
<label
htmlFor="agreeTerms"
className="text-sm text-gray-600 cursor-pointer"
>
I agree to the Terms and Privacy Policy
</label>
</div>
<ErrorMessage
name="agreeTerms"
component="p"
className="text-red-500 text-sm mt-1"
/>

{/* Submit */}
<Button
type="submit"
disabled={isSubmitting || isLoading}
aria-busy={isSubmitting || isLoading}
className="w-full"
>
{isSubmitting || isLoading ? "Creating account..." : "Create Account"}
</Button>

{/* Link */}
<p className="text-center text-sm text-gray-600">
Already have an account?{" "}
<button
type="button"
onClick={() => setCurrentPage("login")}
className="text-primary font-medium hover:underline"
>
Sign In
</button>
</p>
</Form>
)}
</Formik>
);

const renderSuccessPage = () => (
<div className="text-center animate-in zoom-in duration-500">
{/* Success Animation */}
<div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
<Check className="w-16 h-16 text-white animate-bounce" />
<div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-25" />
</div>

<h1 className="text-3xl font-bold text-gray-800 mb-4">
Welcome to GymPass! 🎉
</h1>
<p className="text-gray-600 mb-8 px-4">
Your account has been created successfully. Start exploring gyms near
you!
</p>

{/* Success Stats */}
<div className="grid grid-cols-2 gap-4 mb-8">
<div className="bg-white rounded-2xl p-4 shadow-lg">
<div className="text-3xl mb-2">🏋️‍♂️</div>
<p className="font-bold text-gray-800">50+ Gyms</p>
<p className="text-sm text-gray-600">Ready to explore</p>
</div>
<div className="bg-white rounded-2xl p-4 shadow-lg">
<div className="text-3xl mb-2">🎯</div>
<p className="font-bold text-gray-800">Free Trial</p>
<p className="text-sm text-gray-600">7 days included</p>
</div>
</div>

<button
onClick={() => {
// In real app, navigate to main app
setCurrentPage("welcome");
setFormData({
email: "",
password: "",
confirmPassword: "",
fullName: "",
phone: "",
agreeTerms: false,
});
}}
className="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
>
<span>Start Exploring</span>
<Dumbbell className="w-5 h-5" />
</button>
</div>
);


// -----------------
// MAIN PAGE
// -----------------
return (
<div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden">
{/* Background Pattern */}
<div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-purple-50 opacity-50" />

{/* Content Container */}
<div className="relative z-10 min-h-screen flex items-center justify-center">
{/* Status Bar */}
<div className="h-6 bg-gradient-to-r from-primary to-purple-600 absolute left-0 top-0 w-full h-10" />

{/* Main Content */}
<div className="px-6 py-8">
{currentPage === "welcome" && renderWelcomePage()}
{currentPage === "login" && renderLoginPage()}
{currentPage === "register" && renderRegisterPage()}
{currentPage === "success" && renderSuccessPage()}
</div>
</div>

{/* Loading Overlay */}
{isLoading && (
<div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
<div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
<p className="text-gray-600 font-medium">
{currentPage === "login"
? "Signing you in..."
: "Creating your account..."}
</p>
</div>
)}
</div>
);
};

export default GymPassAuth;