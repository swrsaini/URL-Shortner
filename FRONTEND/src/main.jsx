import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import {routeTree} from './routing/routeTree.js'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()
const router = createRouter({
    routeTree,
    context: {
        queryClient,
        store
    },
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
)
