# Task Manager API

Este projeto é uma API RESTful para gerenciamento de tarefas, construída usando Django e Django REST Framework. Ela permite criar, listar, atualizar e deletar tarefas. Além disso, ela se integra ao Google Calendar para gerenciar eventos baseados em tarefas.

## Tecnologias Utilizadas
- Python 3.11
- Django 4.x
- Django REST Framework (DRF)
- Google Calendar API

## Requisitos

Certifique-se de ter o seguinte instalado antes de configurar o projeto:
- Python 3.11
- Conta do Google com permissões para usar a API do Google Calendar

## Configuração do Ambiente

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/matheusticiano/API-CRUD-DJANGO.git
   cd task_manager
   ```

2. **Crie e ative o ambiente virtual:**
    ```bash
    python -m venv venv
    source venv/bin/activate   # No Windows: venv\Scripts\activate
    pip install -r requirements.txt
    ```


3. **Migrações do Banco de Dados**
   Execute as migrações do Django para configurar o banco de dados:
   ```bash
   python manage.py migrate
   ```

4. **Executar o Servidor de Desenvolvimento**
   ```bash
   python manage.py runserver
   ```

## Endpoints da API


Para utilizar todas as funcoes da API corretamente lembre-se de estar Logado e Autenticado.

Ao executar o a criacao de uma Task pela primeira vez , voce sera redirecionado para fazer o Login com sua conta do Google.

Ao ser logado no google um arquivo sera criado na raiz do projeto com o nome token.pickle contendo suas informacoes de usuario para proximos usos ( apague-o e faca login novamente caso queria mudar a conta utilizada no seu google agendas).


https://documenter.getpostman.com/view/27491960/2sAXqp7iGg

### Integração com Google Calendar
Toda vez que você cria ou atualiza uma tarefa, um evento correspondente é criado ou atualizado em seu Google Calendar. Certifique-se de que suas credenciais da API do Google Calendar estão corretamente configuradas.

## Testes

Para rodar os testes unitários e garantir que tudo está funcionando como esperado:

```bash
python manage.py test
```

## Considerações Finais

Esta API é uma solução simples, mas extensível, para gerenciamento de tarefas e eventos.
