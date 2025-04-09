# Utiliser l'image Apache officielle
FROM httpd:2.4
 
# Supprimer le contenu par défaut d'Apache (optionnel)
RUN rm -rf /usr/local/apache2/htdocs/*
 
# Copier tout ton site dans le dossier d’Apache
COPY . /usr/local/apache2/htdocs/
 
# Exposer le port 80
EXPOSE 80
 # coucou