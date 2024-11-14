'use client'
import Code from './a.mdx'
export default function InstallPage() {
  return (
    <div>
      <div>
        <Code />
        <h1>Installing NextJS Uploader</h1>
        <p>To install NextJS Uploader, follow the steps below:</p>
        <ol>
          <li>Install the package using npm or yarn:</li>
          <pre>
            <code>npm install nextjs-uploader</code>
            <code>yarn add nextjs-uploader</code>
          </pre>
          <li>Import the package in your NextJS project:</li>
          <pre>
            <code>&lt;Uploader /&gt;</code>
          </pre>
        </ol>
      </div>
    </div>
  )
}
