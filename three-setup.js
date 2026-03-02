    // ==================== 3D CAMPFIRE ATMOSPHERE ====================
    import * as THREE from 'three';
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0B1E10); // Match campfire green
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 1, 0);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('three-canvas').appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    
    const fireLight = new THREE.PointLight(0xFF6600, 2, 10);
    fireLight.position.set(0, 1.5, 0);
    scene.add(fireLight);
    
    // ==================== FIRE ====================
    const fireGroup = new THREE.Group();
    
    // Fire base (glow)
    const glowGeometry = new THREE.SphereGeometry(0.6, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xFF5500,
      transparent: true,
      opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.y = 0.5;
    fireGroup.add(glow);
    
    // Flames (multiple particles)
    const flameCount = 30;
    const flames = [];
    
    for (let i = 0; i < flameCount; i++) {
      const geometry = new THREE.ConeGeometry(0.1 + Math.random()*0.1, 0.3 + Math.random()*0.3, 8);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.05 + Math.random()*0.1, 1, 0.5),
        emissive: new THREE.Color().setHSL(0.05, 1, 0.2),
      });
      const flame = new THREE.Mesh(geometry, material);
      
      flame.position.x = (Math.random() - 0.5) * 0.6;
      flame.position.z = (Math.random() - 0.5) * 0.6;
      flame.position.y = 0.2 + Math.random() * 0.5;
      
      flame.userData = {
        speed: 0.5 + Math.random(),
        offset: Math.random() * Math.PI * 2,
        baseY: flame.position.y,
        baseScale: 0.8 + Math.random() * 0.4
      };
      
      flame.castShadow = true;
      flame.receiveShadow = false;
      fireGroup.add(flame);
      flames.push(flame);
    }
    
    // Logs (wood)
    const logMaterial = new THREE.MeshStandardMaterial({ color: 0x8B5A2B });
    
    const log1 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.5), logMaterial);
    log1.rotation.z = 0.3;
    log1.rotation.x = 0.2;
    log1.position.set(0.3, 0.1, 0.2);
    fireGroup.add(log1);
    
    const log2 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.5), logMaterial);
    log2.rotation.z = -0.2;
    log2.rotation.x = -0.1;
    log2.position.set(-0.2, 0.1, -0.3);
    fireGroup.add(log2);
    
    const log3 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.2), logMaterial);
    log3.rotation.x = 0.5;
    log3.rotation.z = 0.4;
    log3.position.set(-0.1, 0.05, 0.4);
    fireGroup.add(log3);
    
    scene.add(fireGroup);
    
    // ==================== SPARKS ====================
    const sparkGroup = new THREE.Group();
    const sparkCount = 50;
    const sparks = [];
    
    for (let i = 0; i < sparkCount; i++) {
      const geometry = new THREE.SphereGeometry(0.02 + Math.random()*0.03, 4);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.1 + Math.random()*0.2, 1, 0.6),
        emissive: new THREE.Color().setHSL(0.1, 1, 0.3),
      });
      const spark = new THREE.Mesh(geometry, material);
      
      spark.userData = {
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
        radius: 0.8 + Math.random() * 0.5,
        height: 1 + Math.random() * 2,
        angle: Math.random() * Math.PI * 2
      };
      
      sparkGroup.add(spark);
      sparks.push(spark);
    }
    
    scene.add(sparkGroup);
    
    // ==================== BAZZI 3D (Low-Poly) ====================
    const bazziGroup = new THREE.Group();
    bazziGroup.position.set(2, 0.5, 1);
    
    // Body
    const bodyGeo = new THREE.BoxGeometry(0.6, 0.8, 0.4);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2A4A2A, emissive: 0x1A3A1A });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.4;
    bazziGroup.add(body);
    
    // Head
    const headGeo = new THREE.SphereGeometry(0.3, 8);
    const headMat = new THREE.MeshStandardMaterial({ color: 0x3A5A3A, emissive: 0x1A3A1A });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.0;
    bazziGroup.add(head);
    
    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.08, 6);
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0xFFD8A8 });
    
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.1, 1.05, 0.25);
    bazziGroup.add(eyeL);
    
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeR.position.set(0.1, 1.05, 0.25);
    bazziGroup.add(eyeR);
    
    // Antenna
    const antennaGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.2);
    const antennaMat = new THREE.MeshStandardMaterial({ color: 0xFF9341 });
    const antenna = new THREE.Mesh(antennaGeo, antennaMat);
    antenna.position.set(0, 1.2, 0.1);
    antenna.rotation.x = 0.2;
    bazziGroup.add(antenna);
    
    const antennaBallGeo = new THREE.SphereGeometry(0.07, 4);
    const antennaBall = new THREE.Mesh(antennaBallGeo, antennaMat);
    antennaBall.position.set(0, 1.3, 0.15);
    bazziGroup.add(antennaBall);
    
    scene.add(bazziGroup);
    
    // ==================== ANIMATION LOOP ====================
    let clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      const time = performance.now() / 1000;
      
      // Animate flames
      flames.forEach((flame, index) => {
        const speed = flame.userData.speed;
        const offset = flame.userData.offset;
        flame.scale.y = 0.8 + Math.sin(time * speed * 5 + offset) * 0.3;
        flame.scale.x = 0.9 + Math.sin(time * speed * 3 + offset) * 0.1;
        flame.position.y = flame.userData.baseY + Math.sin(time * speed * 8 + offset) * 0.1;
        
        // Color shift
        const hue = 0.05 + Math.sin(time * 0.5 + index) * 0.05;
        flame.material.color.setHSL(hue, 1, 0.5);
      });
      
      // Animate sparks
      sparks.forEach((spark) => {
        const data = spark.userData;
        data.angle += delta * data.speed * 2;
        
        spark.position.x = Math.cos(data.angle) * data.radius;
        spark.position.z = Math.sin(data.angle * 1.3) * data.radius;
        spark.position.y = 1 + Math.sin(data.angle * 2) * data.height;
        
        // Fade in/out
        spark.material.opacity = 0.3 + Math.sin(data.angle * 3) * 0.3;
      });
      
      // Animate Bazzi (gentle float)
      bazziGroup.position.y = 0.5 + Math.sin(time * 2) * 0.05;
      bazziGroup.rotation.y += 0.005;
      
      // Pulse fire light
      fireLight.intensity = 1.5 + Math.sin(time * 10) * 0.3;
      
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
