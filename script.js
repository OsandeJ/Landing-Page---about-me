function toggleMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1); // Remove o '#'
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
});
document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    const formData = {
      nome: this.nome.value,
      email: this.email.value,
      telefone: this.telefone.value,
      mensagem: this.mensagem.value
    };
  
    const response = await fetch("http://localhost:5000/enviar-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
  
    const result = await response.json();
    if (result.success) {
      // Mostrar o modal com fade-in
      const modal = document.getElementById("successModal");
      modal.classList.add("show");
      
      // Resetar o formulário após o sucesso
      document.getElementById("contact-form").reset();
  
      // Esconder o modal com fade-out após 7 segundos
      setTimeout(function() {
        modal.classList.remove("show");
      }, 5000); // 5000 ms = 7 segundos
    } else {
      alert(result.error);
    }
  });
  
