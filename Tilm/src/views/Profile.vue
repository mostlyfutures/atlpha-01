    <template>
  <div class="signin-container">
    <h2>Welcome Back</h2>
    <button class="signin-btn">Sign in with Wallet Connect</button>
    <button class="signin-btn">Sign in with Email</button>
  </div>
</template>

<style scoped>
.signin-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  z-index: 1;
}

h2 {
  margin-bottom: 32px;
  color: #111;
}

.signin-btn {
  width: 280px;
  padding: 16px 0;
  margin: 12px 0;
  border: 2px solid #111;
  border-radius: 18px;
  background: #fff;
  color: #111;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s, border-color 0.2s;
}
.signin-btn:hover {
  background: #f0f0f0;
  box-shadow: 0 4px 16px rgba(0,0,0,0.13);
  border-color: #000;
}
</style>
