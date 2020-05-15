package co.edu.ucentral.eventos.config;

import io.github.jhipster.config.JHipsterProperties;
import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, co.edu.ucentral.eventos.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, co.edu.ucentral.eventos.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, co.edu.ucentral.eventos.domain.User.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Authority.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.User.class.getName() + ".authorities");
            createCache(cm, co.edu.ucentral.eventos.domain.Persona.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.TipoIdentificacion.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.UsuarioUcentral.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Nodo.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Institucion.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Institucion.class.getName() + ".delegadoInstitucionals");
            createCache(cm, co.edu.ucentral.eventos.domain.Departamento.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Ciudad.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Programa.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Estudiante.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Estudiante.class.getName() + ".proyectos");
            createCache(cm, co.edu.ucentral.eventos.domain.Profesor.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Semillero.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Proyecto.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Proyecto.class.getName() + ".estudiantes");
            createCache(cm, co.edu.ucentral.eventos.domain.ProyectoCategoria.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.AreaConocimiento.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.AreaConocimiento.class.getName() + ".eventos");
            createCache(cm, co.edu.ucentral.eventos.domain.Evento.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Evento.class.getName() + ".areaConocimientos");
            createCache(cm, co.edu.ucentral.eventos.domain.Evento.class.getName() + ".areas");
            createCache(cm, co.edu.ucentral.eventos.domain.Evento.class.getName() + ".reglas");
            createCache(cm, co.edu.ucentral.eventos.domain.Evento.class.getName() + ".estadisticas");
            createCache(cm, co.edu.ucentral.eventos.domain.Inscripcion.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.DelegadoInstitucional.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.DelegadoInstitucional.class.getName() + ".institucions");
            createCache(cm, co.edu.ucentral.eventos.domain.TipoArea.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Area.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Area.class.getName() + ".eventos");
            createCache(cm, co.edu.ucentral.eventos.domain.Ponencia.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Ponencia.class.getName() + ".evaluadors");
            createCache(cm, co.edu.ucentral.eventos.domain.Evaluacion.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Evaluador.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Evaluador.class.getName() + ".ponencias");
            createCache(cm, co.edu.ucentral.eventos.domain.Regla.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Regla.class.getName() + ".eventos");
            createCache(cm, co.edu.ucentral.eventos.domain.Estadistica.class.getName());
            createCache(cm, co.edu.ucentral.eventos.domain.Estadistica.class.getName() + ".eventos");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }
}
