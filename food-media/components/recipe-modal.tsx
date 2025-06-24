"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Clock, Users, Plus, Check, Heart, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Recipe {
  id: number
  image: string
  title: string
  cookTime: string
  servings: number
  difficulty: string
  ingredients: string[]
  instructions: string[]
  user: {
    name: string
    avatar: string
    isFriend: boolean
  }
}

interface RecipeModalProps {
  recipe: Recipe | null
  isOpen: boolean
  onClose: () => void
}

export function RecipeModal({ recipe, isOpen, onClose }: RecipeModalProps) {
  const [isFriend, setIsFriend] = useState(recipe?.user.isFriend || false)
  const [isLiked, setIsLiked] = useState(false)

  if (!recipe) return null

  const toggleFriend = () => {
    setIsFriend(!isFriend)
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative aspect-square md:aspect-auto">
            <Image
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col">
            {/* Header */}
            <DialogHeader className="space-y-4">
              <DialogTitle className="text-2xl font-bold leading-tight">{recipe.title}</DialogTitle>

              {/* Recipe Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {recipe.cookTime}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {recipe.servings} servings
                </div>
                <Badge variant="secondary">{recipe.difficulty}</Badge>
              </div>
            </DialogHeader>

            {/* User Info */}
            <div className="flex items-center justify-between py-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={recipe.user.avatar || "/placeholder.svg"} alt={recipe.user.name} />
                  <AvatarFallback>{recipe.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">{recipe.user.name}</p>
                  <p className="text-sm text-gray-500">Recipe Creator</p>
                </div>
              </div>
              <Button
                variant={isFriend ? "default" : "outline"}
                size="sm"
                onClick={toggleFriend}
                className={isFriend ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {isFriend ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Friends
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Friend
                  </>
                )}
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 py-4">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={toggleLike}
                className={isLiked ? "bg-red-600 hover:bg-red-700" : ""}
              >
                <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>

            {/* Ingredients */}
            <div className="space-y-3 mb-6">
              <h3 className="text-lg font-semibold">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="space-y-3 flex-1">
              <h3 className="text-lg font-semibold">Instructions</h3>
              <ol className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
