<template>
	<div>
		<div v-if="!beingeditted">
			<h1>게시글 상세 정보</h1>
			<p>category : {{ post_detail.category }}</p>
			<p>{{ post_id }}번 글</p>
			<h3>title: {{ post_detail.title }}</h3>
			<hr>
			<p>created_at: {{ post_detail.created_at?.slice(0, 10) }}</p>
			<p>updated_at: {{ post_detail.updated_at?.slice(0, 10) }}</p>
			<hr>
			<p>content: {{ post_detail.content }}</p>
			<button @click="editPost(post_detail)">edit</button>
			<button>delete</button>
			<hr>
			<form @submit="createComment()">
				<label for="comment">content :</label>
				<input type="text" name="comment" v-model="commentText">
				<button>add comment</button>
			</form>
			<hr>
			<div v-if="isEmpty">
				<div 
				v-for="comment in store.comments"
				:key="comment.id"
				>
					<p>{{ comment.id }}번 댓글</p>
					<p>{{ comment.content }}</p>
					<p>created_at: {{ comment.created_at?.slice(0, 10) }}</p>
					<hr>
				</div>
			</div>
			<div v-else>
				<p>아직 댓글이 없습니다.</p>
			</div>
		</div>
		<div v-else>
			<form @submit="updatePost()">
				<label for="title">title :</label>
				<input type="text" name="title" v-model="title">
				<label for="content">content :</label>
				<textarea name="content" v-model="content"></textarea>
				<input type="submit">
      		</form>
		</div>
		
		
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { useCounterStore } from '../stores/counter';
import axios from 'axios';
const store = useCounterStore()
const route = useRoute()
const post_id = route.params.id
const post_detail = ref('')
const commentText = ref('')
const title = ref('')
const content = ref('')
const beingeditted = ref(false)
const isEmpty = computed(() => {
	return store.comments.length > 0
})
const createComment = function () {
	axios({
		method: 'post',
		url: `${store.API_URL}/api/v1/post/${post_id}/comment`,
		data: {
			content: commentText.value,
			post: post_id,
		}
	})
		.then((res) => {
			console.log(res)
		})
		.catch((err) => {
			console.log(err)
		})
}

onMounted(() => {
	axios({
		method: 'get',
		url: `${store.API_URL}/api/v1/post/${post_id}/`
	})
		.then((res) => {
			console.log(res)
			// console.log(res.data)
			post_detail.value = res.data
		})
		.catch((err) => {
			console.log(err)
		})
	store.getComments(post_id)
})

const editPost = function (item) {
	beingeditted.value = !beingeditted.value
	title.value = item.title
	content.value = item.content
} 
const updatePost = function () {
	axios({
		method: 'put',
		url: `${store.API_URL}/api/v1/post/${post_id}/`,
		data: {
			title: title.value,
			content: content.value,
		}
	})
		.then((res) => {
			console.log(res)
		})
		.catch((err) => {
			console.log(err)
		})
}

</script>

<style scoped>

</style>