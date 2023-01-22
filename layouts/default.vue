<template>
    <div>
        <header class="shadow-sm bg-white">
            <nav class="container mx-auto p-4 flex justify-between">
                <NuxtLink to="/" class="font-bold">LIFE App</NuxtLink>
                <ul class="flex gap-4">
                    <li> <NuxtLink to="/">Home</NuxtLink></li>
                    <li> <NuxtLink to="/todos" class="btn">Todos</NuxtLink></li>
                    <li> <NuxtLink to="/docs">Docs</NuxtLink></li>
                </ul>
            </nav>
        </header>

    <!-- output page content -->
    <div class="container mx-auto p-4">
        <slot />
    </div>
    </div>
</template>

<style scoped>
    .router-link-exact-active {
        color: #12b488;
    }
</style>
