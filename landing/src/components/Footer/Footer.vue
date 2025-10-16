<script setup lang="ts">
import { ref } from 'vue'
import { Mail, ArrowRight, Github, Twitter, Linkedin, Send } from 'lucide-vue-next'

const email = ref('')

const handleSubmit = () => {
  if (email.value) {
    alert(`Thanks for subscribing with: ${email.value}`)
    email.value = ''
  }
}

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Security', href: '#security' },
    { name: 'Roadmap', href: '#roadmap' }
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Careers', href: '#careers' },
    { name: 'Blog', href: '#blog' },
    { name: 'Press Kit', href: '#press' }
  ],
  support: [
    { name: 'Help Center', href: '#help' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'Status', href: '#status' },
    { name: 'Terms', href: '#terms' }
  ]
}

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'Github' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Send, href: '#', label: 'Telegram' }
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <!-- Newsletter Section -->
      <div class="newsletter">
        <div class="newsletterContent">
          <h2 class="newsletterTitle">
            Register Wallet Now and Start Invest Now
          </h2>
          <p class="newsletterDescription">
            Get started in minutes. Join thousands of users who trust CryptoSwap.
          </p>
        </div>
        <form class="newsletterForm" @submit.prevent="handleSubmit">
          <div class="inputWrapper">
            <Mail class="inputIcon" :size="20" />
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="input"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Get Started
            <ArrowRight :size="20" />
          </button>
        </form>
      </div>

      <!-- Footer Links -->
      <div class="footerMain">
        <div class="footerBrand">
          <div class="logo">
            <div class="logoIcon">K</div>
            <span class="logoText">KNOWCHAIN</span>
          </div>
          <p class="brandDescription">
            The most trusted cryptocurrency platform. Secure, fast, and easy to use.
          </p>
          <div class="socialLinks">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              class="socialLink"
              :aria-label="social.label"
            >
              <component :is="social.icon" :size="20" />
            </a>
          </div>
        </div>

        <div class="linksGrid">
          <div class="linkColumn">
            <h4 class="linkTitle">Product</h4>
            <ul class="linkList">
              <li v-for="link in footerLinks.product" :key="link.name">
                <a :href="link.href" class="link">{{ link.name }}</a>
              </li>
            </ul>
          </div>

          <div class="linkColumn">
            <h4 class="linkTitle">Company</h4>
            <ul class="linkList">
              <li v-for="link in footerLinks.company" :key="link.name">
                <a :href="link.href" class="link">{{ link.name }}</a>
              </li>
            </ul>
          </div>

          <div class="linkColumn">
            <h4 class="linkTitle">Support</h4>
            <ul class="linkList">
              <li v-for="link in footerLinks.support" :key="link.name">
                <a :href="link.href" class="link">{{ link.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footerBottom">
        <p class="copyright">
          © 2025 CryptoSwap. All rights reserved.
        </p>
        <div class="bottomLinks">
          <a href="#privacy" class="bottomLink">Privacy Policy</a>
          <a href="#terms" class="bottomLink">Terms of Service</a>
          <a href="#cookies" class="bottomLink">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped src="./Footer.scss"></style>
