export class AuthView {
    renderLogin(appContainer) {
        appContainer.innerHTML = `
            <main class="container" style="max-width: 400px; margin-top: 4rem;">
                <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <h2 style="text-align: center; margin-bottom: 1.5rem; color: #0654ba;">Iniciar Sesión</h2>
                    <form onsubmit="event.preventDefault(); window.handleLogin(this.email.value, this.password.value);">
                        <div style="margin-bottom: 1rem;">
                            <label style="display:block; margin-bottom:0.5rem;">Correo Electrónico</label>
                            <input type="email" name="email" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display:block; margin-bottom:0.5rem;">Contraseña</label>
                            <input type="password" name="password" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                        <button type="submit" style="width: 100%; background-color: #0654ba; color: white;">Ingresar</button>
                    </form>
                    <p style="text-align: center; margin-top: 1rem; font-size: 0.9rem;">
                        ¿No tienes cuenta? <a href="#" onclick="window.showRegister()" style="color: #ff9900;">Regístrate aquí</a>
                    </p>
                </div>
            </main>
        `;
    }

    renderRegister(appContainer) {
        appContainer.innerHTML = `
            <main class="container" style="max-width: 400px; margin-top: 4rem;">
                <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <h2 style="text-align: center; margin-bottom: 1.5rem; color: #0654ba;">Crear Cuenta</h2>
                    <form onsubmit="event.preventDefault(); window.handleRegister(this.email.value, this.password.value, this.confirm.value);">
                        <div style="margin-bottom: 1rem;">
                            <label style="display:block; margin-bottom:0.5rem;">Correo Electrónico</label>
                            <input type="email" name="email" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label style="display:block; margin-bottom:0.5rem;">Contraseña</label>
                            <input type="password" name="password" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display:block; margin-bottom:0.5rem;">Confirmar Contraseña</label>
                            <input type="password" name="confirm" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                        <button type="submit" style="width: 100%; background-color: #ff9900; color: #111;">Registrarse</button>
                    </form>
                    <p style="text-align: center; margin-top: 1rem; font-size: 0.9rem;">
                        ¿Ya tienes cuenta? <a href="#" onclick="window.showLogin()" style="color: #0654ba;">Inicia sesión</a>
                    </p>
                </div>
            </main>
        `;
    }
}
