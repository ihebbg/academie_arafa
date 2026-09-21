# Académie Arafa — Ghar El Melh

Site vitrine responsive en HTML, CSS et JavaScript natif, sans compilation ni dépendance à installer.

## Ouvrir le site

Ouvrir `index.html` dans un navigateur. Pour utiliser un serveur local depuis ce dossier :

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Puis ouvrir http://127.0.0.1:8080.

## Contenu et personnalisation

- `index.html` : présentation, catégories, entraîneurs, horaires, galerie, contact et FAQ.
- `styles.css` : couleurs, typographie, mise en page et adaptations mobile/tablette.
- `script.js` : navigation mobile, onglets horaires, filtres, galerie au clavier et année du pied de page.
- Les fichiers JPG d’origine sont conservés et utilisés directement.
- La typographie utilise Google Fonts, avec des polices de secours si la connexion est indisponible.

Le nom « Arafa » reprend l’orthographe du logo. Les noms et fonctions des entraîneurs sont retranscrits des affiches fournies. Les catégories et horaires proviennent de `rentre.jpg` et `rentre1.jpg` ; ces affiches ne précisent pas leur année de validité. Une mention invite les visiteurs à confirmer les créneaux auprès de l’académie.

Le contact et les demandes d’inscription passent par la page Facebook fournie. Aucun formulaire ne simule l’envoi de données. Aucun téléphone, tarif, résultat sportif ou adresse précise non vérifié n’est ajouté.

## Publication

Copier `index.html`, `styles.css`, `script.js` et les fichiers JPG sur un hébergement statique. Conserver leur position relative. Pour le partage social après publication, remplacer la valeur `og:image` par l’URL absolue de `gallarie5.jpg` et ajouter l’URL publique du site à une balise `og:url`.
