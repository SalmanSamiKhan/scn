<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
</script>

<div class="flex justify-center items-center h-[80vh] px-4">
  <Card.Root class="max-w-sm py-6">
    <Card.Header>
      <Card.Title class="text-2xl">Login</Card.Title>
      <Card.Description>Enter your username below to login to your account</Card.Description>
    </Card.Header>
    <Card.Content>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Username</Label>
          <Input id="email" type="email" placeholder="Username" required />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a href="##" class="ml-auto inline-block text-sm underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" placeholder="*****" required />
        </div>
        <Button type="submit" class="w-full">Login</Button>
      </div>
      <!-- <div class="mt-4 text-center text-sm">
        Don&apos;t have an account?
        <a href="##" class="underline">Sign up</a>
      </div> -->
    </Card.Content>
  </Card.Root>
</div>
