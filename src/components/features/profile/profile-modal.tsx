"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Pencil, Upload, X, Camera } from "lucide-react"
import { useUserStore } from "@/store/user-store"
import { updateUserProfile } from "@/api/users.api"
import Image from "next/image"
import { resizeProfileImage } from "@/utils/resize"


export default function ProfileEditModal() {
  const [open, setOpen] = useState(false)
  const { id, name, surnames, image, description, setUser } = useUserStore()
  const [formData, setFormData] = useState({
    name: name || "",
    surnames: surnames || "",
    image: image || "",
    description: description || "",
  })
  const [imagePreview, setImagePreview] = useState(image || "")
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image") {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, image: reader.result as string }));
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  

  const removeImage = () => {
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image: "" }));
  
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).value = "";
    }
  };
  

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (formData.image.startsWith("data:image")) {
        const response = await fetch(formData.image);
        const blob = await response.blob();
        const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
      
        const resizedFile = await resizeProfileImage(file);
        console.log(resizedFile)
        const reader = new FileReader();
        reader.readAsDataURL(resizedFile);
        reader.onloadend = async () => {
          formData.image = reader.result as string;
          await updateUserProfile(id, formData);
          setUser(formData);
          setOpen(false);
        };
      } else {
        await updateUserProfile(id, formData);
        setUser(formData);
        setOpen(false);
      }
      
      await updateUserProfile(id, formData);
      setUser(formData);
      setOpen(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 h-8 w-8"
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile information here.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" />
          </div>
          <div>
            <label className="block text-sm font-medium">Surname</label>
            <Input
              name="surnames"
              value={formData.surnames}
              onChange={handleInputChange}
              placeholder="Enter your surname"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <Input
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Profile Image</label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-4 text-center border-gray-300 dark:border-gray-700}`}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                name="image"
                onChange={handleInputChange}
                className="hidden"
              />

              {imagePreview ? (
                <div className="flex flex-col items-center">
                  <div className="relative mb-2">
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="Profile Preview"
                      height={32}
                      width={32}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={triggerFileInput} className="mt-2">
                    Change Image
                  </Button>
                </div>
              ) : (
                <div className="py-4">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Drag and drop an image here, or</p>
                  <Button type="button" variant="outline" onClick={triggerFileInput} className="mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Select Image
                  </Button>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-[#4461f2] hover:bg-[#3a53d9]">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

