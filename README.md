# Gomi ♻️

## Description

Frontend de l'app Gomi -- projet CloudVision
[Repo principal](https://github.com/arthurGuillemin/Gomi)

## Membres du groupe :
- **Guillemin Arthur**
   - Github: [https://github.com/arthurGuillemin](https://github.com/arthurGuillemin)

- **Kelly Gama**
   - Github: [https://github.com/yelineeee](https://github.com/yelineeee)

- **Ryan ANNIC**
   - Github: [https://github.com/gladiaaa](https://github.com/gladiaaa)
   - 
- **Emilie Caverne**
   - Github: [https://github.com/emilie-caverne](https://github.com/emilie-caverne)


## 🌍 Déploiement

- 🌐 **App principale** (frontend) : [Netlify](https://gomiproject.netlify.app/)



## Installation

### Pré-requis

- Node.js

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/arthurGuillemin/GomiFrontend
    cd GomiFrontend
    code .
    ```
2. Accédez au répertoire du projet :

    ```bash
    cd client
    ```

## Lancer avec le dockerfile :
    ```bash
    docker build -t gomiFrontend .
    docker run -d -p 8080:80 --name front-container gomiFrontend  
    ```
Cela ouvrira l'application dans votre navigateur par défaut à l'adresse `http://localhost`.

## Ou manuellement

3. Installez les dépendances :
    ```bash
    npm install
    ```

4. Pour lancer l'application:

   ```bash
   npm run dev
   ```
Cela ouvrira l'application dans votre navigateur par défaut à l'adresse `http://localhost:5173`.


