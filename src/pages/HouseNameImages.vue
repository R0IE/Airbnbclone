<template>
  <div class="host-step-container">
    <h2>Name your house & add images</h2>
    <form @submit.prevent="submitHouseInfo">
      <div class="form-group">
        <label for="houseName">House Name</label>
        <input id="houseName" v-model="houseName" type="text" required placeholder="e.g. Cozy Cottage" />
      </div>
      <div class="form-group">
        <label for="houseImages">Images</label>
        <input id="houseImages" type="file" multiple accept="image/*" @change="handleImageUpload" />
        <div class="image-preview-list">
          <img v-for="(img, i) in imagePreviews" :key="i" :src="img" class="image-preview" />
        </div>
      </div>
      <button class="host-next-btn" type="submit">Save & Continue</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase.js';
const houseName = ref('');
const images = ref([]);
const imagePreviews = ref([]);
const router = useRouter();

function handleImageUpload(e) {
  const files = Array.from(e.target.files);
  images.value = files;
  imagePreviews.value = files.map(file => URL.createObjectURL(file));
}

async function submitHouseInfo() {
  let imageUrls = [];
  for (const file of images.value) {
    const { data, error } = await supabase.storage.from('house-images').upload(`houses/${Date.now()}-${file.name}`, file);
    if (error) {
      console.error('Image upload error:', error.message);
      continue;
    }
    if (data) {
      const url = supabase.storage.from('house-images').getPublicUrl(data.path).publicUrl;
      imageUrls.push(url);
    }
  }

  const { error: insertError } = await supabase.from('houses').insert({
    name: houseName.value,
    images: Array.isArray(imageUrls) ? imageUrls : []
  });
  if (!insertError) {
    router.push('/house-added');
  }
}
</script>

<style scoped>
.host-step-container {
  max-width: 480px;
  margin: 3rem auto;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
}
.form-group {
  margin-bottom: 2rem;
}
label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}
input[type="text"] {
  width: 100%;
  padding: 0.7rem;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 1.1rem;
}
input[type="file"] {
  margin-top: 0.5rem;
}
.image-preview-list {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.image-preview {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #eee;
}
.host-next-btn {
  background: #ff385c;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  transition: background 0.2s;
}
.host-next-btn:hover {
  background: #e03150;
}
</style>
