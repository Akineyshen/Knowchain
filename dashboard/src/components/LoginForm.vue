<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card class="min-w-[400px]">
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          Welcome back
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div class="grid gap-6">
            <div class="grid gap-6">
              <div class="grid gap-3">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div class="grid gap-3">
                <div class="flex items-center">
                  <Label for="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" class="w-full">
                Login
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
