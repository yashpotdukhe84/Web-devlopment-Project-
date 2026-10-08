// import React from 'react'
// import { useAuth } from '../contexts/AuthContext'
// import { useCampaigns } from '../contexts/CampaignContext'
// import { Link } from 'react-router-dom'
// import { 
//   Heart, 
//   TrendingUp, 
//   Users, 
//   DollarSign, 
//   Calendar, 
//   MapPin, 
//   Plus,
//   Eye,
//   Edit,
//   BarChart3,
//   Target,
//   Clock
// } from 'lucide-react'
// import DonationChart from '../components/charts/DonationChart'
// import CampaignProgressChart from '../components/charts/CampaignProgressChart'
// import DonorImpactChart from '../components/charts/DonorImpactChart'
// import VolunteerChart from '../components/charts/VolunteerChart'
// import GeneralAnalytics from '../components/charts/GeneralAnalytics'

// const Dashboard = () => {
//   const { user } = useAuth()
//   const { campaigns, donations, volunteers } = useCampaigns()

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-secondary-900 mb-4">Please log in to access your dashboard</h2>
//           <Link to="/login" className="btn-primary">Login</Link>
//         </div>
//       </div>
//     )
//   }

//   // Get user-specific data
//   const userCampaigns = campaigns.filter(c => c.ngo.id === user.id)
//   const userDonations = donations.filter(d => d.donorId === user.id)
//   const userVolunteerWork = volunteers.filter(v => v.volunteerId === user.id)

//   // Calculate stats based on user type
//   const getStats = () => {
//     switch (user.userType) {
//       case 'ngo':
//         return [
//           {
//             label: 'Active Campaigns',
//             value: userCampaigns.filter(c => c.status === 'active').length,
//             icon: Target,
//             color: 'bg-primary-100 text-primary-600'
//           },
//           {
//             label: 'Total Raised',
//             value: `$${userCampaigns.reduce((sum, c) => sum + c.currentAmount, 0).toLocaleString()}`,
//             icon: DollarSign,
//             color: 'bg-success-100 text-success-600'
//           },
//           {
//             label: 'Total Volunteers',
//             value: userCampaigns.reduce((sum, c) => sum + c.currentVolunteers, 0),
//             icon: Users,
//             color: 'bg-warning-100 text-warning-600'
//           },
//           {
//             label: 'Completed Campaigns',
//             value: userCampaigns.filter(c => c.status === 'completed').length,
//             icon: BarChart3,
//             color: 'bg-secondary-100 text-secondary-600'
//           }
//         ]
//       case 'donor':
//         return [
//           {
//             label: 'Total Donated',
//             value: `$${userDonations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}`,
//             icon: DollarSign,
//             color: 'bg-success-100 text-success-600'
//           },
//           {
//             label: 'Campaigns Supported',
//             value: new Set(userDonations.map(d => d.campaignId)).size,
//             icon: Heart,
//             color: 'bg-primary-100 text-primary-600'
//           },
//           {
//             label: 'This Month',
//             value: `$${userDonations
//               .filter(d => new Date(d.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
//               .reduce((sum, d) => sum + d.amount, 0).toLocaleString()}`,
//             icon: TrendingUp,
//             color: 'bg-warning-100 text-warning-600'
//           },
//           {
//             label: 'Impact Score',
//             value: 'High',
//             icon: BarChart3,
//             color: 'bg-secondary-100 text-secondary-600'
//           }
//         ]
//       case 'volunteer':
//         return [
//           {
//             label: 'Active Projects',
//             value: userVolunteerWork.filter(v => v.status === 'active').length,
//             icon: Target,
//             color: 'bg-primary-100 text-primary-600'
//           },
//           {
//             label: 'Hours Contributed',
//             value: '120+',
//             icon: Clock,
//             color: 'bg-success-100 text-success-600'
//           },
//           {
//             label: 'Projects Completed',
//             value: userVolunteerWork.filter(v => v.status === 'completed').length,
//             icon: BarChart3,
//             color: 'bg-warning-100 text-warning-600'
//           },
//           {
//             label: 'Impact Score',
//             value: 'Excellent',
//             icon: Heart,
//             color: 'bg-secondary-100 text-secondary-600'
//           }
//         ]
//       default:
//         return []
//     }
//   }

//   const stats = getStats()

//   const getRecentActivity = () => {
//     switch (user.userType) {
//       case 'ngo':
//         return userCampaigns.slice(0, 3)
//       case 'donor':
//         return userDonations.slice(0, 3)
//       case 'volunteer':
//         return userVolunteerWork.slice(0, 3)
//       default:
//         return []
//     }
//   }

//   const recentActivity = getRecentActivity()

//   return (
//     <div className="min-h-screen bg-secondary-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-secondary-900">
//             Welcome back, {user.name}!
//           </h1>
//           <p className="text-secondary-600 mt-2">
//             Here's what's happening with your {user.userType} activities.
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <div key={index} className="card">
//               <div className="flex items-center">
//                 <div className={`p-3 rounded-lg ${stat.color}`}>
//                   <stat.icon className="w-6 h-6" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-secondary-600">{stat.label}</p>
//                   <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {user.userType === 'donor' && (
//             <>
//               <DonationChart donations={userDonations} campaigns={campaigns} />
//               <DonorImpactChart donations={userDonations} />
//             </>
//           )}
//           {user.userType === 'ngo' && (
//             <>
//               <CampaignProgressChart campaigns={userCampaigns} />
//               <VolunteerChart volunteers={volunteers} campaigns={userCampaigns} />
//             </>
//           )}
//           {user.userType === 'volunteer' && (
//             <>
//               <VolunteerChart volunteers={userVolunteerWork} campaigns={campaigns} />
//               <DonationChart donations={donations} campaigns={campaigns} />
//             </>
//           )}
//         </div>

//         {/* General Analytics */}
//         <div className="mb-8">
//           <GeneralAnalytics campaigns={campaigns} donations={donations} />
//         </div>


//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Recent Activity */}
//           <div className="lg:col-span-2">
//             <div className="card">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-secondary-900">Recent Activity</h2>
//                 <Link to="/campaigns" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
//                   View all
//                 </Link>
//               </div>

//               <div className="space-y-4">
//                 {recentActivity.length > 0 ? (
//                   recentActivity.map((activity, index) => (
//                     <div key={index} className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-lg">
//                       {user.userType === 'ngo' ? (
//                         <>
//                           <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
//                             <Target className="w-6 h-6 text-primary-600" />
//                           </div>
//                           <div className="flex-1">
//                             <h3 className="font-medium text-secondary-900">{activity.title}</h3>
//                             <p className="text-sm text-secondary-600">
//                               {activity.progress}% complete • ${activity.currentAmount.toLocaleString()} raised
//                             </p>
//                           </div>
//                           <div className="text-right">
//                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                               activity.status === 'active' 
//                                 ? 'bg-success-100 text-success-800' 
//                                 : 'bg-secondary-100 text-secondary-800'
//                             }`}>
//                               {activity.status}
//                             </span>
//                           </div>
//                         </>
//                       ) : user.userType === 'donor' ? (
//                         <>
//                           <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
//                             <DollarSign className="w-6 h-6 text-success-600" />
//                           </div>
//                           <div className="flex-1">
//                             <h3 className="font-medium text-secondary-900">
//                               Donated ${activity.amount.toLocaleString()}
//                             </h3>
//                             <p className="text-sm text-secondary-600">
//                               {activity.message || 'Thank you for your contribution!'}
//                             </p>
//                           </div>
//                           <div className="text-right">
//                             <span className="text-sm text-secondary-500">
//                               {new Date(activity.createdAt).toLocaleDateString()}
//                             </span>
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
//                             <Users className="w-6 h-6 text-warning-600" />
//                           </div>
//                           <div className="flex-1">
//                             <h3 className="font-medium text-secondary-900">
//                               Volunteered for {activity.campaignId}
//                             </h3>
//                             <p className="text-sm text-secondary-600">
//                               Skills: {activity.skills?.join(', ')}
//                             </p>
//                           </div>
//                           <div className="text-right">
//                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                               activity.status === 'active' 
//                                 ? 'bg-success-100 text-success-800' 
//                                 : 'bg-secondary-100 text-secondary-800'
//                             }`}>
//                               {activity.status}
//                             </span>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-8">
//                     <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <Calendar className="w-8 h-8 text-secondary-400" />
//                     </div>
//                     <h3 className="text-lg font-medium text-secondary-900 mb-2">No recent activity</h3>
//                     <p className="text-secondary-600 mb-4">
//                       {user.userType === 'ngo' 
//                         ? 'Create your first campaign to get started!'
//                         : 'Start exploring campaigns to make an impact!'
//                       }
//                     </p>
//                     <Link to="/campaigns" className="btn-primary">
//                       {user.userType === 'ngo' ? 'Create Campaign' : 'Browse Campaigns'}
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="space-y-6">
//             <div className="card">
//               <h2 className="text-xl font-semibold text-secondary-900 mb-4">Quick Actions</h2>
//               <div className="space-y-3">
//                 {user.userType === 'ngo' && (
//                   <Link to="/create-campaign" className="flex items-center p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
//                     <Plus className="w-5 h-5 text-primary-600 mr-3" />
//                     <span className="text-primary-700 font-medium">Create New Campaign</span>
//                   </Link>
//                 )}
//                 <Link to="/campaigns" className="flex items-center p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
//                   <Eye className="w-5 h-5 text-secondary-600 mr-3" />
//                   <span className="text-secondary-700 font-medium">Browse Campaigns</span>
//                 </Link>
//                 <Link to="/profile" className="flex items-center p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
//                   <Edit className="w-5 h-5 text-secondary-600 mr-3" />
//                   <span className="text-secondary-700 font-medium">Edit Profile</span>
//                 </Link>
//               </div>
//             </div>

//             {/* User Type Badge */}
//             <div className="card">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
//                   {user.userType === 'ngo' ? (
//                     <Target className="w-6 h-6 text-primary-600" />
//                   ) : user.userType === 'donor' ? (
//                     <Heart className="w-6 h-6 text-primary-600" />
//                   ) : (
//                     <Users className="w-6 h-6 text-primary-600" />
//                   )}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-secondary-900">
//                     {user.userType === 'ngo' ? 'NGO' : user.userType === 'donor' ? 'Donor' : 'Volunteer'}
//                   </h3>
//                   <p className="text-sm text-secondary-600">
//                     {user.verified ? 'Verified Account' : 'Account Pending Verification'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard




import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useCampaigns } from '../contexts/CampaignContext'
import { Link } from 'react-router-dom'
import {
  Heart,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Plus,
  Eye,
  Edit,
  BarChart3,
  Target,
  Clock,
  BadgeCheck,
  ShieldAlert,
  ChevronRight
} from 'lucide-react'
import DonationChart from '../components/charts/DonationChart'
import CampaignProgressChart from '../components/charts/CampaignProgressChart'
import DonorImpactChart from '../components/charts/DonorImpactChart'
import VolunteerChart from '../components/charts/VolunteerChart'
import GeneralAnalytics from '../components/charts/GeneralAnalytics'

/* ---------- Design tokens (standard Tailwind colors, no config changes needed) ---------- */

const TONES = {
  teal: 'bg-teal-50 text-teal-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  sky: 'bg-sky-50 text-sky-700',
  rose: 'bg-rose-50 text-rose-700'
}

const ROLE_META = {
  ngo: {
    label: 'NGO',
    icon: Target,
    blurb: 'Track your campaigns, funds raised and volunteers in one place.'
  },
  donor: {
    label: 'Donor',
    icon: Heart,
    blurb: 'See where your donations are going and the difference they make.'
  },
  volunteer: {
    label: 'Volunteer',
    icon: Users,
    blurb: 'Keep up with your projects and the impact of your time.'
  }
}

const CARD = 'rounded-2xl bg-white ring-1 ring-slate-200/70 shadow-sm'
const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2'

const statusClasses = (status) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
    case 'completed':
      return 'bg-slate-100 text-slate-700 ring-slate-500/20'
    default:
      return 'bg-amber-50 text-amber-700 ring-amber-600/20'
  }
}

const StatusPill = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${statusClasses(
      status
    )}`}
  >
    {status}
  </span>
)

const Dashboard = () => {
  const { user } = useAuth()
  const { campaigns, donations, volunteers } = useCampaigns()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className={`${CARD} max-w-sm w-full p-8 text-center`}>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <Heart className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Log in to see your dashboard</h2>
          <p className="mt-2 text-sm text-slate-600">
            Your campaigns, donations and volunteer work are waiting for you.
          </p>
          <Link
            to="/login"
            className={`mt-6 inline-flex w-full items-center justify-center rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 ${FOCUS}`}
          >
            Log in
          </Link>
        </div>
      </div>
    )
  }

  // Get user-specific data
  const userCampaigns = campaigns.filter((c) => c.ngo.id === user.id)
  const userDonations = donations.filter((d) => d.donorId === user.id)
  const userVolunteerWork = volunteers.filter((v) => v.volunteerId === user.id)

  const campaignTitle = (id) => campaigns.find((c) => c.id === id)?.title ?? id

  // Calculate stats based on user type
  const getStats = () => {
    switch (user.userType) {
      case 'ngo':
        return [
          {
            label: 'Active campaigns',
            value: userCampaigns.filter((c) => c.status === 'active').length,
            icon: Target,
            tone: 'teal'
          },
          {
            label: 'Total raised',
            value: `$${userCampaigns.reduce((sum, c) => sum + c.currentAmount, 0).toLocaleString()}`,
            icon: DollarSign,
            tone: 'emerald'
          },
          {
            label: 'Total volunteers',
            value: userCampaigns.reduce((sum, c) => sum + c.currentVolunteers, 0),
            icon: Users,
            tone: 'amber'
          },
          {
            label: 'Completed campaigns',
            value: userCampaigns.filter((c) => c.status === 'completed').length,
            icon: BarChart3,
            tone: 'sky'
          }
        ]
      case 'donor':
        return [
          {
            label: 'Total donated',
            value: `$${userDonations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}`,
            icon: DollarSign,
            tone: 'emerald'
          },
          {
            label: 'Campaigns supported',
            value: new Set(userDonations.map((d) => d.campaignId)).size,
            icon: Heart,
            tone: 'rose'
          },
          {
            label: 'Last 30 days',
            value: `$${userDonations
              .filter((d) => new Date(d.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
              .reduce((sum, d) => sum + d.amount, 0)
              .toLocaleString()}`,
            icon: TrendingUp,
            tone: 'amber'
          },
          {
            label: 'Impact score',
            value: 'High',
            icon: BarChart3,
            tone: 'sky'
          }
        ]
      case 'volunteer':
        return [
          {
            label: 'Active projects',
            value: userVolunteerWork.filter((v) => v.status === 'active').length,
            icon: Target,
            tone: 'teal'
          },
          {
            label: 'Hours contributed',
            value: '120+',
            icon: Clock,
            tone: 'emerald'
          },
          {
            label: 'Projects completed',
            value: userVolunteerWork.filter((v) => v.status === 'completed').length,
            icon: BarChart3,
            tone: 'amber'
          },
          {
            label: 'Impact score',
            value: 'Excellent',
            icon: Heart,
            tone: 'rose'
          }
        ]
      default:
        return []
    }
  }

  const stats = getStats()

  const getRecentActivity = () => {
    switch (user.userType) {
      case 'ngo':
        return userCampaigns.slice(0, 3)
      case 'donor':
        return userDonations.slice(0, 3)
      case 'volunteer':
        return userVolunteerWork.slice(0, 3)
      default:
        return []
    }
  }

  const recentActivity = getRecentActivity()
  const role = ROLE_META[user.userType] ?? ROLE_META.volunteer
  const RoleIcon = role.icon
  const isNgo = user.userType === 'ngo'

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="relative overflow-hidden rounded-3xl bg-teal-950 px-6 py-8 text-white sm:px-10 sm:py-10">
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-teal-50 ring-1 ring-inset ring-white/15">
                  <RoleIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {role.label}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${
                    user.verified
                      ? 'bg-emerald-400/15 text-emerald-100 ring-emerald-300/30'
                      : 'bg-amber-400/15 text-amber-100 ring-amber-300/30'
                  }`}
                >
                  {user.verified ? (
                    <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {user.verified ? 'Verified account' : 'Pending verification'}
                </span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Welcome back, {user.name}
              </h1>
              <p className="mt-2 text-base text-teal-100/80">{role.blurb}</p>
            </div>

            <Link
              to={isNgo ? '/create-campaign' : '/campaigns'}
              className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-teal-950 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950`}
            >
              {isNgo ? (
                <Plus className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
              {isNgo ? 'New campaign' : 'Browse campaigns'}
            </Link>
          </div>
        </header>

        {/* Stats */}
        <section aria-label="Key numbers" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className={`${CARD} p-5`}>
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                <div className={`rounded-lg p-2 ${TONES[stat.tone]}`}>
                  <stat.icon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight text-slate-900">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        {/* Charts */}
        <section aria-label="Charts" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {user.userType === 'donor' && (
            <>
              <DonationChart donations={userDonations} campaigns={campaigns} />
              <DonorImpactChart donations={userDonations} />
            </>
          )}
          {user.userType === 'ngo' && (
            <>
              <CampaignProgressChart campaigns={userCampaigns} />
              <VolunteerChart volunteers={volunteers} campaigns={userCampaigns} />
            </>
          )}
          {user.userType === 'volunteer' && (
            <>
              <VolunteerChart volunteers={userVolunteerWork} campaigns={campaigns} />
              <DonationChart donations={donations} campaigns={campaigns} />
            </>
          )}
        </section>

        {/* General analytics */}
        <section aria-label="Platform analytics">
          <GeneralAnalytics campaigns={campaigns} donations={donations} />
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent activity */}
          <section className={`${CARD} lg:col-span-2`}>
            <div className="flex items-center justify-between px-6 pb-2 pt-6">
              <h2 className="text-lg font-semibold text-slate-900">Recent activity</h2>
              <Link
                to="/campaigns"
                className={`rounded text-sm font-medium text-teal-700 hover:text-teal-900 ${FOCUS}`}
              >
                View all
              </Link>
            </div>

            {recentActivity.length > 0 ? (
              <ul className="divide-y divide-slate-100 px-6 pb-2">
                {recentActivity.map((activity, index) => (
                  <li key={activity.id ?? index} className="flex items-center gap-4 py-4">
                    {isNgo ? (
                      <>
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${TONES.teal}`}>
                          <Target className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-medium text-slate-900">{activity.title}</h3>
                          <p className="text-sm text-slate-600">
                            ${(activity.currentAmount ?? 0).toLocaleString()} raised
                            <span className="text-slate-400"> · </span>
                            {activity.progress ?? 0}% of goal
                          </p>
                          <div
                            className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
                            role="progressbar"
                            aria-valuenow={Math.min(activity.progress ?? 0, 100)}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            <div
                              className="h-full rounded-full bg-teal-600"
                              style={{ width: `${Math.min(activity.progress ?? 0, 100)}%` }}
                            />
                          </div>
                        </div>
                        <StatusPill status={activity.status} />
                      </>
                    ) : user.userType === 'donor' ? (
                      <>
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${TONES.emerald}`}>
                          <DollarSign className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-slate-900">
                            Donated ${activity.amount.toLocaleString()}
                          </h3>
                          <p className="truncate text-sm text-slate-600">
                            {activity.message || 'Thank you for your contribution!'}
                          </p>
                        </div>
                        <time className="shrink-0 text-sm text-slate-500" dateTime={activity.createdAt}>
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </time>
                      </>
                    ) : (
                      <>
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${TONES.amber}`}>
                          <Users className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-medium text-slate-900">
                            Volunteered for {campaignTitle(activity.campaignId)}
                          </h3>
                          <p className="truncate text-sm text-slate-600">
                            {activity.skills?.length
                              ? `Skills: ${activity.skills.join(', ')}`
                              : 'No skills listed'}
                          </p>
                        </div>
                        <StatusPill status={activity.status} />
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-12 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Calendar className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">No activity yet</h3>
                <p className="mx-auto mt-1 max-w-xs text-sm text-slate-600">
                  {isNgo
                    ? 'Create your first campaign to start raising funds and finding volunteers.'
                    : 'Find a campaign you care about and make your first contribution.'}
                </p>
                <Link
                  to={isNgo ? '/create-campaign' : '/campaigns'}
                  className={`mt-5 inline-flex items-center rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 ${FOCUS}`}
                >
                  {isNgo ? 'Create campaign' : 'Browse campaigns'}
                </Link>
              </div>
            )}
          </section>

          {/* Quick actions */}
          <section className={`${CARD} self-start p-6`}>
            <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
            <ul className="mt-3 -mx-2 space-y-1">
              {[
                isNgo && { to: '/create-campaign', label: 'Create new campaign', icon: Plus, tone: 'teal' },
                { to: '/campaigns', label: 'Browse campaigns', icon: Eye, tone: 'sky' },
                { to: '/profile', label: 'Edit profile', icon: Edit, tone: 'amber' }
              ]
                .filter(Boolean)
                .map((action) => (
                  <li key={action.to}>
                    <Link
                      to={action.to}
                      className={`group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50 ${FOCUS}`}
                    >
                      <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${TONES[action.tone]}`}>
                        <action.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="flex-1 text-sm font-medium text-slate-800">{action.label}</span>
                      <ChevronRight
                        className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard