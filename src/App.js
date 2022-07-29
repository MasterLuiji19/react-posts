import React, {useMemo, useState} from 'react';
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Description'},
        {id: 2, title: 'Css', body: 'Xescription'},
        {id: 3, title: 'HTML', body: 'Fescription'},
    ])
    const [filter, setFilter] = useState({sort: '', query: ''})

    const [modal, setModal] = useState(false);

    const sortedPosts = useMemo(() => {
        if(filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts;
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    //Получаем пост из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
      <div className="App">
          <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
              Создать пользователя
          </MyButton>
          <MyModal
              visible={modal}
              setVisible={setModal}
          >
              <PostForm create={createPost}/>
          </MyModal>
          <hr style={{margin: "15px 0"}}/>
          <PostFilter
            filter={filter}
            setFilter={setFilter}
          />
          <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про Front-end"/>
      </div>
    );
}

export default App;
