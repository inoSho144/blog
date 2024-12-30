import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "@/views/HomeView.vue";
import EditComponent from "@/components/post/EditPost.vue";
import CreateComponent from "@/components/post/CreatePost.vue";
import PostComponent from "@/components/post/PostPost.vue";

const routes = [
  { path: "/", redirect: { name: "home" } },
  { path: "/home", name: "home", component: HomeComponent },
  { path: "/create", name: "Create", component: CreateComponent },
  { path: "/edit/:id", name: "Edit", component: EditComponent },
  { path: "/post/:id", name: "Post", component: PostComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
