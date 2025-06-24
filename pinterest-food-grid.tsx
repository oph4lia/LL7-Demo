"use client"

import { useState } from "react"
import Image from "next/image"
import { Share, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { RecipeSidebar } from "./components/recipe-sidebar"
import { RecipeModal } from "./components/recipe-modal"

interface Recipe {
  id: number
  image: string
  title: string
  height: string
  cookTime: string
  servings: number
  difficulty: string
  overlay?: string
  ingredients: string[]
  instructions: string[]
  user: {
    name: string
    avatar: string
    isFriend: boolean
  }
}

const foodPins: Recipe[] = [
  {
    id: 1,
    image: "/images/pancakes.jpg",
    title: "Fluffy Buttermilk Pancakes",
    height: "h-80",
    cookTime: "15 mins",
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      "2 cups all-purpose flour",
      "2 tablespoons sugar",
      "2 teaspoons baking powder",
      "1 teaspoon salt",
      "2 cups buttermilk",
      "2 large eggs",
      "4 tablespoons melted butter",
      "1 teaspoon vanilla extract",
    ],
    instructions: [
      "In a large bowl, whisk together flour, sugar, baking powder, and salt.",
      "In another bowl, whisk together buttermilk, eggs, melted butter, and vanilla.",
      "Pour the wet ingredients into the dry ingredients and stir until just combined. Don't overmix.",
      "Heat a griddle or large skillet over medium heat and lightly grease.",
      "Pour 1/4 cup of batter for each pancake onto the griddle.",
      "Cook until bubbles form on surface and edges look set, about 2-3 minutes.",
      "Flip and cook until golden brown on the other side, 1-2 minutes more.",
      "Serve immediately with butter and maple syrup.",
    ],
    user: {
      name: "Sarah Johnson",
      avatar: "/images/users/sarah.jpg",
      isFriend: false,
    },
  },
  {
    id: 2,
    image: "/images/pasta.jpg",
    title: "Creamy Garlic Parmesan Pasta",
    height: "h-96",
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      "1 lb fettuccine pasta",
      "4 cloves garlic, minced",
      "1 cup heavy cream",
      "1 cup grated Parmesan cheese",
      "4 tablespoons butter",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "Fresh parsley for garnish",
    ],
    instructions: [
      "Cook pasta according to package directions until al dente. Reserve 1 cup pasta water.",
      "In a large skillet, heat olive oil and butter over medium heat.",
      "Add minced garlic and sauté for 1 minute until fragrant.",
      "Pour in heavy cream and bring to a gentle simmer.",
      "Add Parmesan cheese and whisk until melted and smooth.",
      "Add drained pasta to the sauce and toss to combine.",
      "Add pasta water if needed to achieve desired consistency.",
      "Season with salt and pepper, garnish with parsley and serve.",
    ],
    user: {
      name: "Mike Chen",
      avatar: "/images/users/mike.jpg",
      isFriend: true,
    },
  },
  {
    id: 3,
    image: "/images/burger.jpg",
    title: "Classic Beef Burger",
    height: "h-72",
    cookTime: "25 mins",
    servings: 4,
    difficulty: "Medium",
    overlay: "Perfect for weekend grilling",
    ingredients: [
      "1.5 lbs ground beef (80/20)",
      "4 hamburger buns",
      "4 slices cheese",
      "1 large onion, sliced",
      "2 tomatoes, sliced",
      "Lettuce leaves",
      "Pickles",
      "Salt and pepper",
      "Your favorite condiments",
    ],
    instructions: [
      "Divide ground beef into 4 equal portions and form into patties.",
      "Season both sides with salt and pepper.",
      "Preheat grill or skillet to medium-high heat.",
      "Cook patties for 4-5 minutes on first side without pressing down.",
      "Flip and cook for 3-4 minutes more for medium doneness.",
      "Add cheese in the last minute of cooking if desired.",
      "Toast buns lightly on the grill or in a toaster.",
      "Assemble burgers with your favorite toppings and condiments.",
    ],
    user: {
      name: "Emma Davis",
      avatar: "/images/users/emma.jpg",
      isFriend: false,
    },
  },
  {
    id: 4,
    image: "/images/pizza.jpg",
    title: "Homemade Margherita Pizza",
    height: "h-64",
    cookTime: "30 mins",
    servings: 2,
    difficulty: "Medium",
    ingredients: [
      "1 pizza dough (store-bought or homemade)",
      "1/2 cup pizza sauce",
      "8 oz fresh mozzarella, sliced",
      "Fresh basil leaves",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "Cornmeal for dusting",
    ],
    instructions: [
      "Preheat oven to 475°F (245°C). If using a pizza stone, place it in the oven.",
      "Roll out pizza dough on a floured surface to desired thickness.",
      "Transfer to a pizza pan or parchment paper dusted with cornmeal.",
      "Spread pizza sauce evenly, leaving a border for the crust.",
      "Arrange mozzarella slices over the sauce.",
      "Drizzle with olive oil and season with salt and pepper.",
      "Bake for 12-15 minutes until crust is golden and cheese is bubbly.",
      "Remove from oven, top with fresh basil leaves and serve immediately.",
    ],
    user: {
      name: "David Wilson",
      avatar: "/images/users/david.jpg",
      isFriend: true,
    },
  },
  {
    id: 5,
    image: "/images/tacos.jpg",
    title: "Chicken Tacos with Avocado",
    height: "h-80",
    cookTime: "15 mins",
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      "1 lb chicken breast, diced",
      "8 small corn tortillas",
      "2 avocados, sliced",
      "1 cup shredded lettuce",
      "1/2 cup diced tomatoes",
      "1/4 cup diced red onion",
      "1/4 cup cilantro, chopped",
      "Lime wedges",
      "Taco seasoning",
      "2 tablespoons oil",
    ],
    instructions: [
      "Season diced chicken with taco seasoning.",
      "Heat oil in a large skillet over medium-high heat.",
      "Cook chicken for 6-8 minutes until fully cooked and slightly crispy.",
      "Warm tortillas in a dry skillet or microwave.",
      "Fill each tortilla with cooked chicken.",
      "Top with lettuce, tomatoes, red onion, and avocado slices.",
      "Garnish with cilantro and serve with lime wedges.",
      "Serve immediately while chicken is hot.",
    ],
    user: {
      name: "Lisa Rodriguez",
      avatar: "/images/users/lisa.jpg",
      isFriend: false,
    },
  },
  {
    id: 6,
    image: "/images/salad.jpg",
    title: "Fresh Garden Salad",
    height: "h-88",
    cookTime: "10 mins",
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      "6 cups mixed greens",
      "1 cucumber, sliced",
      "2 tomatoes, chopped",
      "1/2 red onion, thinly sliced",
      "1/4 cup olive oil",
      "2 tablespoons balsamic vinegar",
      "1 teaspoon Dijon mustard",
      "Salt and pepper to taste",
      "1/4 cup crumbled feta cheese",
    ],
    instructions: [
      "Wash and dry all vegetables thoroughly.",
      "In a large bowl, combine mixed greens, cucumber, and tomatoes.",
      "Add thinly sliced red onion to the bowl.",
      "In a small bowl, whisk together olive oil, balsamic vinegar, and Dijon mustard.",
      "Season dressing with salt and pepper to taste.",
      "Pour dressing over salad and toss gently to combine.",
      "Top with crumbled feta cheese.",
      "Serve immediately for best freshness.",
    ],
    user: {
      name: "Alex Thompson",
      avatar: "/images/users/alex.jpg",
      isFriend: true,
    },
  },
]

export default function PinterestFoodGrid() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRecipe(null)
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <RecipeSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-white">
          {/* Header with Sidebar Trigger */}
          <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-8 w-8" />
              <h1 className="text-xl font-bold text-gray-900">Recipe Collection</h1>
            </div>
          </header>

          {/* Main Content */}
          <div className="p-4">
            {/* Masonry Grid Container */}
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 space-y-4">
              {foodPins.map((pin) => (
                <div key={pin.id} className="break-inside-avoid mb-4 group cursor-pointer">
                  <div
                    className="relative rounded-2xl overflow-hidden bg-gray-100 hover:brightness-95 transition-all duration-200 shadow-sm hover:shadow-md"
                    onClick={() => handleRecipeClick(pin)}
                  >
                    {/* Pin Image */}
                    <div className={`relative ${pin.height} w-full`}>
                      <Image
                        src={pin.image || "/placeholder.svg"}
                        alt={pin.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                      />

                      {/* Cook Time Badge */}
                      <div className="absolute top-3 left-3">
                        <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {pin.cookTime}
                        </div>
                      </div>

                      {/* Overlay Text */}
                      {pin.overlay && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium text-center max-w-[80%]">
                            {pin.overlay}
                          </div>
                        </div>
                      )}

                      {/* Hover Actions */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2 text-sm font-semibold shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle save functionality
                          }}
                        >
                          Save
                        </Button>
                      </div>

                      {/* Bottom Actions */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-white/90 hover:bg-white rounded-full p-2 h-8 w-8 shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle share functionality
                          }}
                        >
                          <Share className="h-4 w-4 text-gray-700" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-white/90 hover:bg-white rounded-full p-2 h-8 w-8 shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle more options
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4 text-gray-700" />
                        </Button>
                      </div>
                    </div>

                    {/* Pin Info */}
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 mb-1">
                        {pin.title}
                      </h3>
                      <p className="text-gray-500 text-xs">by {pin.user.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recipe Modal */}
        <RecipeModal recipe={selectedRecipe} isOpen={isModalOpen} onClose={handleCloseModal} />
      </SidebarInset>
    </SidebarProvider>
  )
}
