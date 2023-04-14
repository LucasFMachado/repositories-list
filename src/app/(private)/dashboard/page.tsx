import BookmarkItem from '@/components/BookmarkItem'
import FilterMenu from '@/components/FilterMenu'
import './styles.scss'

export default function Dashboard() {
  return (
    <main className="page_content">
      <section className="bookmarks_section">
        <h2 className="title">My Bookmarks</h2>
        <div className="bookmarks">
          <BookmarkItem />
          <BookmarkItem />
          <BookmarkItem />
          <BookmarkItem />
        </div>
      </section>
      <section className="bookmarks_section">
        <h4 className="title">Toggle topics to show</h4>
        <div className="topics_selection">
          <button className="selected">Vue</button>
          <button>Typescript</button>
          <button className="selected">Javascript</button>
          <button>Go</button>
          <button>CSS</button>
          <button>Node</button>
        </div>

        <div className="bookmark_topic">
          <FilterMenu title="Top Vue" />
          <div className="bookmarks">
            <BookmarkItem />
            <BookmarkItem />
            <BookmarkItem />
            <BookmarkItem />
          </div>
        </div>

        <div className="bookmark_topic">
          <FilterMenu title="Top Javascript" />
          <div className="bookmarks">
            <BookmarkItem />
            <BookmarkItem />
            <BookmarkItem />
            <BookmarkItem />
          </div>
        </div>
      </section>
    </main>
  )
}
